import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    //Save Profile
    const saveProfile = async (name, contactOffice, contactEmail) => {
        //Updates profile table in supabase
        const {data, error} = await supabase
        .from("profile")
        .update({
            name: name,
            contact_office: contactOffice,
            contact_email: contactEmail,
        }).eq("id", session?.user?.id).select(); //Make sure that the current user changes only their own profile

        //handle errors
        if (error) {
            console.error("there was an error saving the profile:", error);
            return { success: false, error: error };
        }
        return { success: true, data: data };
    };

    //Adding new project idea
    const saveProject = async (title, description) => {
        if (!session?.user?.id) {
            return { success: false, error: "No active session" };
        }

        const safeTitle = title?.trim();
        const safeDescription = description?.trim() || "";

        if (!safeTitle) {
            return { success: false, error: "Title is required" };
        }
        
        //Adds new Project Idea to the database in table profile_project
        const { data, error } = await supabase
            .from("profile_project")
            .insert({
                profile_id: session.user.id,
                title: safeTitle,
                description: safeDescription,
            })
            .eq("id", session?.user?.id).select();

        //handle errors
        if (error) {
            console.error("There was an error saving the project idea:", error);
            return { success: false, error };
        }

        return { success: true, data };
    };

    //Sign Up (Not made for it being easy to add supervisors)
    const signUpNewUser = async (email, password) => {
        //sign the user up to the database
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        //handles errors
        if (error) {
            console.error("there was a problem signing up:", error);
            return { success: false, error: error };
        }
        return { success: true, data: data };
    };

    //Sign In
    const signInUser = async (email, password) => {
        try {
            //Checks if correct details were enter to sign in to user with database
            const { data, error } = await supabase.auth.signInWithPassword({
            email: email.toLowerCase(),
            password: password,
            });
    
          //Handle errors
          if (error) {
            console.error("Sign-in error:", error.message); // Log the error for debugging
            return { success: false, error: error.message }; // Return the error
          }
    
          //If no error, return success
          console.log("Sign-in success:", data);
          return { success: true, data }; // Return the user data
        } catch (error) {
          //Handle unexpected issues
          console.error("Unexpected error during sign-in:", error.message);
          return {
            success: false,
            error: "An unexpected error occurred. Please try again.",
          };
        }
      };

    useEffect(() => { 
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

    }, []);

    //Sign out
    const signOut = () => {
        const { error } = supabase.auth.signOut();
        //handles expected errors
        if (error) {
            console.error("there was an error:", error);
        };
    };

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut, saveProfile, saveProject }}>
            {children}
        </AuthContext.Provider>
    )
};

export const UserAuth = () => { 
    return useContext(AuthContext);
}