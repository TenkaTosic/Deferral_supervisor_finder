import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

//make sure user that are not sign in to get access to pages they should not have access to.
const PrivateRoute = ({ children }) => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <p>Loading</p>
    }

    if (!session) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;