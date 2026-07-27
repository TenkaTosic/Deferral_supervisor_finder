import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";
import NavBar from "./NavBar.jsx";

const AddProject = () => {
    const { session, saveProject } = UserAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleAddProjectIdea = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setMessage("Please enter a title.");
            return;
        }

        //Just in-case if non sign in user able to get access to this page
        if (!session?.user?.id) {
            setMessage("You need to be signed in to add a project idea.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const { success, error } = await saveProject(title.trim(), description.trim());

            if (!success) {
                throw error;
            }

            setTitle("");
            setDescription("");
            setMessage("Project idea added successfully.");
            navigate("/");
        } catch (err) {
            console.error("Failed to save project", err);
            setMessage("Failed to save project idea.");
        } finally {
            setLoading(false);
        }
        console.log(session?.user?.id)
    };

    return (
        <div>
            <NavBar />
            <h1>Add Project Idea</h1>
            <form onSubmit={handleAddProjectIdea} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                    className="p-3 w-full bg-black text-white"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="p-3 h-32 w-full bg-black text-white"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" disabled={loading} className="bg-blue-500 text-white p-3 rounded">
                    {loading ? "Saving..." : "Add Project Idea"}
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default AddProject;