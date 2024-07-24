import { lazy } from "react"

const Login = lazy(() => import("../pages/public/auth/Login"))
const Landing = lazy(() => import("../pages/public/landing/Landing"))
const About = lazy(() => import("../pages/public/About"))
const Signup = lazy(() => import("../pages/public/auth/Signup"))
const UpdateProfile = lazy(() => import("../pages/public/auth/UpdateProfile"))
const ForgotPassword = lazy(() => import("../pages/public/auth/ForgotPassword"))

// import Login from "../pages/public/auth/Login";
// import Landing from "../pages/public/landing/Landing";
// import About from "../pages/public/About";
// import Signup from "../pages/public/auth/Signup";
// import UpdateProfile from "../pages/public/auth/UpdateProfile";
// import ForgotPassword from "../pages/public/auth/ForgotPassword";

const publicRoutes = [
    {
        path: '/',
        component: <Landing />
    },

   
]

const authRoutes = [
    {
        path:'/login',
        component: <Login />
    },
    {
        path:"/signup",
        component: <Signup />
    },
    {
        path:'update-profile',
        component: <UpdateProfile />
    },
    {
        path: '/forgot-password',
        component: <ForgotPassword />
    }
]

export {publicRoutes, authRoutes};