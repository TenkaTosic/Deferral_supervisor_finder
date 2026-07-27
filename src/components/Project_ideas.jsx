import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";
import NavBar from "./NavBar.jsx";

const ProjectIdeas = () => {

    const [projectIdeas, setProjectIdeas] = useState([]);

    useEffect(() => {
        const loadAllProjectIdeas = async () => {
            //pulls all data from database of table profile_project to get all project ideas
            const { data, error } = await supabase
                .from('profile_project')
                .select('project_id, title, description, profile_id')
                .order('project_id', { ascending: false }); //orders the project ideas newest one added are on top
            
            //handle errors
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
                {/* Prints all projects ideas on screen */}
                <div style={{
                    display: 'flex', 
                    flexWrap: 'wrap',
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
                    {/* Project title */}
                    <div className="text-white font-bold text-xl">
                        {item.title}
                    </div>
                    {/* Project description */}
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