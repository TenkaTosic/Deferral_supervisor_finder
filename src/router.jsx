import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Supervisors from "./components/Supervisors";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ProjectIdeas from "./components/Project_ideas";
import CreateProfile from "./components/Profile";
import AddProject from "./components/Add_Project_Idea";


export const router = createBrowserRouter([
    {path: "/", element: <Supervisors />},
    {path: "/supervisor-finder", element: <Supervisors />},
    {path: "/signup", element: <Signup />},
    {path: "/signin", element: <Signin />},
    {path: "/project-ideas", element: <ProjectIdeas />},
    {path: "/profile", element: <CreateProfile />},
    {path: "/add-project-idea", element: <AddProject />},
]);