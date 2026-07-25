import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import { UserAuth } from "../context/AuthContext.jsx";

const Profile = () => {
    const { session, saveProfile } = UserAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [contactOffice, setContactOffice] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    const [namePlaceholder, setNamePlaceholder] = useState("Name");
    const [contactOfficePlaceholder, setContactOfficePlaceholder] = useState("Office Room");
    const [contactEmailPlaceholder, setContactEmailPlaceholder] = useState("Contact Email");

    useEffect(() => {
        const loadProfile = async () => {
            const { data, error } = await supabase
                .from("profile")
                .select("name, contact_office, contact_email")
                .eq("id", session?.user?.id);
            
            
            console.log("session id:", session?.user?.id);
            console.log("data:", data);
            console.log("error:", error);

            if (!error && data) {
                setNamePlaceholder(data?.name || "Name");
                setContactOfficePlaceholder(data?.contact_office || "Office Room");
                setContactEmailPlaceholder(data?.contact_email || "Contact Email");
            }
        };

        loadProfile();
    }, [session?.user?.id]);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        const { session, error } = await saveProfile(name, contactOffice, contactEmail); // Use your saveProfile function
        navigate("/");
    };

    return (
        <div className="center">
            <input
                className="p-3 w-100 bg-black text-white"
                type="text"
                placeholder={namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="p-3 w-40 bg-black text-white ml-2"
                type="text"
                placeholder={contactOfficePlaceholder}
                value={contactOffice}
                onChange={(e) => setContactOffice(e.target.value)}
            />

            <div className="center mt-4">
                <input
                    className="p-3 w-150 bg-black text-white"
                    type="email"
                    placeholder={contactEmailPlaceholder}
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                />
            </div>

            <button onClick={handleSaveProfile} className="bg-blue-500 text-white p-3 mt-3 w-fit">
                Save Profile
            </button>
        </div>
    );
};

export default Profile;