import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext.jsx";
import { supabase } from "../supabaseClient.js";
import NavBar from "./NavBar.jsx";

const Supervisors = () => {
    const { session } = UserAuth();

    const [nameTerm, setNameTerm] = useState('');
    const [tagTerm, setTagTerm] = useState('');
    const [supervisors, setSupervisors] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
    const timerId = setTimeout(async () => {
        setLoading(true);

        //Gets data needed to print all supervisors with data relating to them
        let query = supabase
        .from('profile')
        .select(`
            name, 
            contact_email, 
            contact_office,
            profile_tag (
            tag (
                id,
                tag_name
            )
            )
        `)
        .not('name', 'is', null) //if new supervisor was added and never updated their profile
        .neq('name', ''); //if supervisor updated their profile but left their name area empty
        
        //Filters Supervisors by name (for name search)
        if (nameTerm) {
        query = query.ilike('name', `%${nameTerm}%`);
        }

        const { data, error } = await query.order('name', { ascending: true });

        if (!error) {
        let results = data || [];

        //Filter by Tag connect to supervisors (for tag search)
        if (tagTerm) {
            results = results.filter(profile => {
            return profile.profile_tag.some(pt => 
                pt.tag && pt.tag.tag_name && pt.tag.tag_name.toLowerCase().includes(tagTerm.toLowerCase())
            );
            });
        }

        setSupervisors(results);
        }
        setLoading(false);
    }, 300);

    return () => clearTimeout(timerId);
    }, [nameTerm, tagTerm]);   

    return (
        <div>
            <NavBar />
            <h2>Welcome, {session?.user?.email??'Student'}</h2>
            <h1>Supervisors</h1>
            {/* Database of Supervisors being showned */}
            <div>
            {/* Name Search */}
            <input
                type="text"
                value={nameTerm}
                onChange={(e) => setNameTerm(e.target.value)}
                placeholder="Search by name..."
                className="p-2 rounded w-1/2 bg-black border border-white"
            />

            {/* Tag Search */}
            <input
            type="text"
            value={tagTerm}
            onChange={(e) => setTagTerm(e.target.value)}
            placeholder="Search by tag..."
            className="p-2 rounded w-1/2 bg-black border border-white"
            />

            {/* Loading State */}
            {loading && <p className="p-3 text-2xl">Loading...</p>}

            {/* Results List */}
            <div className="Database-of-Supervisors mt-3"
                style={{
                display: 'flex', 
                flexWrap: 'wrap', // Allows items to wrap to the next row
                gap: '20px'}}>
                    {supervisors.map((item) => (
                <div style={{ 
                    padding: '20px', 
                    border: '1px solid #ccc', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px',
                    width: 'calc(50% - 10px)',
                    boxSizing: 'border-box',
                    minWidth: '280px'
                    }} key={item.id}> 
                <div className="text-white font-bold text-xl">
                    {item.name}
                </div>
                <div className="text-white">
                    {item.contact_email || "No Contact Email"}
                </div>
                <div className="text-white">
                    {item.contact_office || ""}
                </div>
                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {item.profile_tag && item.profile_tag.length > 0 ? (
                    item.profile_tag.map((pt, index) => (
                        <span 
                        key={index} 
                        className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                        >
                        {pt.tag?.tag_name || "Unknown Tag"}
                        </span>
                    ))
                    ) : null}
                </div>
                </div>
                ))}
            </div>
      
            {/* Empty State */}
            {!loading && nameTerm && supervisors.length === 0 && (
                <p>No results found.</p>
            )}
            </div>
        </div>
        
    );
};

export default Supervisors;