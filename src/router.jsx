import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Supervisors from "./components/Supervisors";
import ProjectIdeas from "./components/Project_ideas";


export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/signup", element: <Signup />},
    {path: "/signin", element: <Signin />},
    {path: "/supervisor-finder", element: <Supervisors />},
    {path: "/project-ideas", element: <ProjectIdeas />},
]);