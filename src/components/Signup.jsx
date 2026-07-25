import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";

const Signup = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const { session, signUpNewUser } = UserAuth();
const navigate = useNavigate();

const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password); // Call context function

      if (result.success) {
        navigate("/supervisor-finder"); // Navigate to supervisor finder on success
      } else {
        setError(result.error.message); // Show error message on failure
      }
    } catch (err) {
      setError("An unexpected error occurred."); // Catch unexpected errors
    } finally {
      setLoading(false); // End loading state
    }
  };

    return <div>
        <form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
            <h2 className="font-bold pb-2">Sign Up</h2>
            <p>
                Already have an account? <Link className="text-blue-500" to='/signin'>Sign in!</Link>
            </p>
            <div className="flex flex-col py-4">
                <input onChange={(e) => setEmail(e.target.value)} className="p-3 mt-6 bg-black" type="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} className="p-3 mt-6 bg-black" type="password" placeholder="Password" />
                <button type="submit" disabled={loading} className="bg-blue-500 text-white p-3 mt-6">Sign Up</button>
            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
            </div>
        </form>
    </div>
};

export default Signup;