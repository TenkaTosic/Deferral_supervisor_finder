import { createBrowserRouter } from "react-router-dom";
import Supervisors from "./components/Supervisors";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ProjectIdeas from "./components/Project_ideas";
import CreateProfile from "./components/Profile";
import AddProject from "./components/Add_Project_Idea";
import PrivateRoute from "./components/PrivateRoute";


export const router = createBrowserRouter([
    {path: "/", element:<Supervisors />},
    {path: "/signup", element:<Signup />},
    {path: "/signin", element:<Signin />},
    {path: "/project-ideas", element:<ProjectIdeas /> },
    {path: "/profile", element: <PrivateRoute> <CreateProfile/> </PrivateRoute>},
    {path: "/add-project-idea", element: <PrivateRoute><AddProject /></PrivateRoute> },
]);