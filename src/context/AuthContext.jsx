import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    //Save Profile
    const saveProfile = async (name, contactOffice, contactEmail) => {
        const {data, error} = await supabase.from("profile").update({
            name: name,
            contact_office: contactOffice,
            contact_email: contactEmail,
        }).eq("id", session?.user?.id).select();

        if (error) {
            console.error("there was an error saving the profile:", error);
            return { success: false, error: error };
        }
        return { success: true, data: data };
    };

    //Sign Up
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error("there was a problem signing up:", error);
            return { success: false, error: error };
        }
        return { success: true, data: data };
    };

    //Sign In
    const signInUser = async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.toLowerCase(),
            password: password,
          });
    
          // Handle Supabase error explicitly
          if (error) {
            console.error("Sign-in error:", error.message); // Log the error for debugging
            return { success: false, error: error.message }; // Return the error
          }
    
          // If no error, return success
          console.log("Sign-in success:", data);
          return { success: true, data }; // Return the user data
        } catch (error) {
          // Handle unexpected issues
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
        if (error) {
            console.error("there was an error:", error);
        };
    };

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut, saveProfile }}>
            {children}
        </AuthContext.Provider>
    )
};

export const UserAuth = () => { 
    return useContext(AuthContext);
}