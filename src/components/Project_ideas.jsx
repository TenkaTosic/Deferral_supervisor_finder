import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";
import NavBar from "./NavBar.jsx";

const ProjectIdeas = () => {

    const [projectIdeas, setProjectIdeas] = useState([]);

    useEffect(() => {
        const loadAllProjectIdeas = async () => {
            const { data, error } = await supabase
                .from('profile_project')
                .select('project_id, title, description, profile_id')
                .order('project_id', { ascending: false });

            if (error) {
                console.error('Failed to load project ideas:', error);
                return;
            }

            setProjectIdeas(data || []);
        };

        loadAllProjectIdeas();
    }, []);

    return (
        <div>
            <NavBar />
            <h1>Project Ideas</h1>
                <div style={{
                    display: 'flex', 
                    flexWrap: 'wrap', // Allows items to wrap to the next row
                    gap: '20px'}}>
                        {projectIdeas.map((item) => (
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
                        }} key={item.project_id}> 
                    <div className="text-white font-bold text-xl">
                        {item.title}
                    </div>
                    <div className="text-white">
                        {item.description || "No description"}
                    </div>
                </div>
                ))}
            </div>
        </div>

    );
};

export default ProjectIdeas;