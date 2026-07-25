import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";

const Signin = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading] = useState(false);
const [error, setError] = useState('');

const { session, signInUser } = UserAuth();
const navigate = useNavigate();

const handleSignIn = async (e) => {
    e.preventDefault();
    const { session, error } = await signInUser(email, password); // Use your signIn function

    if (error) {
      setError(error); // Set the error message if sign-in fails

      // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
      setTimeout(() => {
        setError("");
      }, 3000); // 3000 milliseconds = 3 seconds
    } else {
      // Redirect or perform any necessary actions after successful sign-in
      navigate("/supervisor-finder");
    }

    if (session) {
      setError(""); // Reset the error when there's a session
    }
  };

    return <div>
        <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
            <h2 className="font-bold pb-2">Sign In Page</h2>
            <p>
                Don't have an account? <Link className="text-blue-500 hover:underline" to='/signup'>Sign up!</Link>
            </p>
            <div className="flex flex-col py-4">
                <input onChange={(e) => setEmail(e.target.value)} className="p-3 mt-6 bg-black" type="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} className="p-3 mt-6 bg-black" type="password" placeholder="Password" />
                <button type="submit" disabled={loading} className="bg-blue-500 text-white p-3 mt-6">Sign In</button>
            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
            </div>
        </form>
    </div>
};

export default Signin;