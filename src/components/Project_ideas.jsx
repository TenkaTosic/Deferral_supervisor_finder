import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import NavBar from "./NavBar.jsx";

const ProjectIdeas = () => {
    const { session, saveProfile } = UserAuth();
    const navigate = useNavigate();

    //project idea being added
        const handleNewProjectIdea = async (e) => {
            e.preventDefault();
    
            navigate("/new-project-idea");
        }

    return (
        <div>
            <NavBar />
            <h1>Project Ideas</h1>
        </div>

    );
};

export default ProjectIdeas;