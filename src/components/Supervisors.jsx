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

    const handleCreateProfile = async (e) => {
        e.preventDefault();
        try {
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }
    };

    const handleProjectIdeas = async (e) => {
        e.preventDefault();
        try {
            navigate('/project-ideas');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Supervisors</h1>
            <h2>Welcome, {session?.user?.email??'Guest'}</h2>

            <button onClick={handleSignIn} className="bg-blue-500 text-white p-2 mt-6 fixed top-5 right-[12%] z-10 ">Sign In</button>
            <button onClick={handleSignOut} className="bg-gray-500 text-white p-2 mt-6 fixed top-5 right-[6%] z-10 ">Sign Out</button>

            {session && (
                <button onClick={handleCreateProfile} className="bg-green-500 text-white p-2 mt-6 fixed top-5 left-[8%] z-10">Profile</button>
            )}

            <button onClick={handleProjectIdeas} className="bg-purple-500 text-white p-2 mt-6 fixed top-5 left-[20%] z-10">Project Ideas</button>

        </div>
        
    );
};

export default Supervisors;