import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";

//Navigation Bar on top of all pages
const NavBar = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();

    const handleSupervisors = async (e) => {
        e.preventDefault();
        try {
            navigate('/');
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

    const handleProfile = async (e) => {
        e.preventDefault();
        try {
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            navigate('/add-project-idea');
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

  return (
    <nav style={{ background: '#16171d', padding: '1rem', color: '#fff' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
        <li style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>Supervisor Finder</li>
        <li className="nav-link" onClick={handleSupervisors} style={{ cursor: 'pointer' }}> Supervisors</li>
        <li className="nav-link" onClick={handleProjectIdeas} style={{ cursor: 'pointer' }}> Project Ideas</li>
        {session && (
        <li className="nav-link" onClick={handleProfile} style={{ cursor: 'pointer' }}> Profile</li>
        )}
        {session && (
        <li className="nav-link" onClick={handleAddProject} style={{ cursor: 'pointer' }}> Add Project Idea</li>
        )}
        {!session && (
        <li className="nav-link ml-auto" onClick={handleSignIn} style={{ cursor: 'pointer' }}> Sign In</li>
        )}
        {session && (
        <li className="nav-link ml-auto" onClick={handleSignOut} style={{ cursor: 'pointer' }}> Sign Out</li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;