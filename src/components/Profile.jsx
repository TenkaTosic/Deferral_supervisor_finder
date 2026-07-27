import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import { UserAuth } from "../context/AuthContext.jsx";
import NavBar from "./NavBar.jsx";

const Profile = () => {
    const { session, saveProfile } = UserAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [contactOffice, setContactOffice] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [projectIdeas, setProjectIdeas] = useState([]);

    useEffect(() => {
        const loadTags = async () => {
            const { data, error } = await supabase
            .from("tag")
            .select("tag_name, id")
            .order("tag_name", { ascending: true });

            if (!error && data) {
                setTags(data);
            }
        };

        const loadSavedTags = async () => {
            if (!session?.user?.id) return;

            const { data, error } = await supabase
                .from("profile_tag")
                .select("tag_id")
                .eq("profile_id", session.user.id);

            if (!error && data) {
                setSelectedTags(data.map((item) => item.tag_id));
            }
        };

        const yourProjectIdeas = async () => {
            const { data, error } = await supabase
                .from('profile_project')
                .select('project_id, title, description')
                .eq("profile_id", session?.user?.id);

            if (!error) setProjectIdeas(data || []);
        };
        

        loadTags();
        loadSavedTags();
        yourProjectIdeas();
    }, [session?.user?.id]);

    //name, email, office room
    useEffect(() => {
        const loadProfile = async () => {
            const { data, error } = await supabase
                .from("profile")
                .select("name, contact_office, contact_email")
                .eq("id", session?.user?.id);

            if (!error && data) {
                setName(data[0]?.name || "Name");
                setContactOffice(data[0]?.contact_office || "Office Room");
                setContactEmail(data[0]?.contact_email || "Contact Email");
            }
        };

        loadProfile();
    }, [session?.user?.id]);

    const handleDeleteProject = async (projectId) => {
        if (!projectId) return;

        const { error } = await supabase
            .from("profile_project")
            .delete()
            .eq("project_id", projectId);

        if (error) {
            console.error("Failed to delete project idea", error);
            return;
        }

        setProjectIdeas((prev) => prev.filter((item) => item.project_id !== projectId));
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();

        const { data: profileData, error: profileError } = await saveProfile(name, contactOffice, contactEmail);

        if (profileError) {
            console.error("Failed to save profile", profileError);
            return;
        }

        const profileId = session?.user?.id;

        if (!profileId) {
            console.error("Profile id was not available");
            return;
        }

        const { error: deleteError } = await supabase
            .from("profile_tag")
            .delete()
            .eq("profile_id", profileId);

        if (deleteError) {
            console.error("Failed to clear old tags", deleteError);
            return;
        }

        if (selectedTags.length > 0) {
            const rows = selectedTags.map((tagId) => ({
                profile_id: profileId,
                tag_id: tagId,
            }));

            const { error: insertError } = await supabase.from("profile_tag").insert(rows);

            if (insertError) {
                console.error("Failed to save selected tags", insertError);
            }
        }

        navigate("/");
    };

    return (
        <div>
            <NavBar />
            <div className="center mt-10 ">
                <input
                    className="p-3 w-100 bg-black text-white"
                    type="text"
                    placeholder={name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="p-3 w-40 bg-black text-white ml-2"
                    type="text"
                    placeholder={contactOffice}
                    value={contactOffice}
                    onChange={(e) => setContactOffice(e.target.value)}
                />

                <div className="center mt-4">
                    <input
                        className="p-3 w-150 bg-black text-white"
                        type="email"
                        placeholder={contactEmail}
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                    />
                </div>
                <div className="text-white text-3xl p-4 mt-6">Interests</div>
                <div className="center mt-4 flex flex-wrap gap-2">
                    {tags.map((item, index) => {
                        const isSelected = selectedTags.includes(item.id);

                        return (
                            <button
                                key={item.id ?? `${item.tag_name}-${index}`}
                                type="button"
                                onClick={() =>
                                    setSelectedTags((prev) =>
                                        prev.includes(item.id)
                                            ? prev.filter((id) => id !== item.id)
                                            : [...prev, item.id]
                                    )
                                }
                                className={`toggle-btn ${isSelected ? "toggled" : ""}`}
                            >
                                {item.tag_name || "Tag"}
                            </button>
                        );
                    })}
                </div>
                <button style={{ cursor: 'pointer' }} onClick={handleSaveProfile} className="bg-blue-500 text-white p-3 mt-3 rounded">
                    Save Profile
                </button>
                    <div className="text-white text-3xl p-4 mt-6">Project Ideas you made</div>
                        <div>{projectIdeas.map((item) => (
                            <div style={{ 
                                padding: '20px', 
                                border: '1px solid #ccc', 
                                borderRadius: '8px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '10px',
                                maxWidth: 'auto'
                                }} key={item.project_id}> 
                            <div className="text-white font-bold text-xl">
                                {item.title}
                            </div>
                            <div className="text-white">
                                {item.description}
                            </div>
                            <div flex justify-center>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteProject(item.project_id)}
                            >
                                Delete
                            </button>
                                </div>
                            
                            </div>
                        
                            ))}
                        </div>
            </div>
        </div>
    );
};

export default Profile;