import React from "react";
import { UserAuth } from "../context/AuthContext.jsx";
import NavBar from "./NavBar.jsx";

const Supervisors = () => {
    const { session } = UserAuth();

    return (
        <div>
            <NavBar />
            <h1>Supervisors</h1>
            <h2>Welcome, {session?.user?.email??'Guest'}</h2>
        </div>
        
    );
};

export default Supervisors;