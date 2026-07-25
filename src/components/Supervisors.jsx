import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";

const Supervisors = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    console.log(session);

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            window.location.reload();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            navigate('/signin');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Supervisors</h1>
            <h2>Welcome, {session?.user?.email??'Guest'}</h2>
            <button onClick={handleSignIn} className="bg-blue-500 text-white p-3 mt-6">Sign In</button>
            <button onClick={handleSignOut} className="bg-gray-500 text-white p-3 mt-6">Sign Out</button>
        </div>
        
    );
};

export default Supervisors;