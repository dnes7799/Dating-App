import { lazy } from "react";
import Views from "../pages/private/Views";
// import EditProfile from "../components/private/settings/EditProfile";


const Groups = lazy(() => import("../pages/private/Groups"))
const Home = lazy(() => import("../pages/private/Home"))
const Messages = lazy(() => import("../pages/private/Messages"))
const Notifications = lazy(() => import("../pages/private/Notifications"))
const Profile = lazy(() => import("../pages/private/Profile"))
const Search = lazy(() => import("../pages/private/Search"))
const Settings = lazy(() => import("../pages/private/Settings"))
const UserDetails = lazy(() => import("../pages/private/UserDetails"))
const EditProfile = lazy(() => import("../components/private/settings/EditProfile"));


// import Groups from "../pages/private/Groups";
// import Home from "../pages/private/Home";
// import Messages from "../pages/private/Messages";
// import Notifications from "../pages/private/Notifications";
// import Profile from "../pages/private/Profile";
// import Search from "../pages/private/Search";
// import Settings from "../pages/private/Settings";
// import UserDetails from "../pages/private/UserDetails";

 const privateRoutes = [
    {
        path: "/home",
        component:<Home />

    },
    {
        path:"/search",
        component:<Search />
    },
    {
        path:"/messages",
        component:<Messages />
    },
    {
        path:"/groups",
        component: <Groups />
    },
    {
        path:"/notifications",
        component:<Notifications />
    },
    {
        path:"/profile",
        component: <Profile />
    },
    {
        path: '/users/:id',
        component: <UserDetails />
    },
    {
        path:"/settings",
        component: <Settings />,
    },
    // {
    //     path: '/settings/edit-profile',
    //     component: <EditProfile />
    // },
    
  
    {
        path: '/views',
        component: <Views />
    }
]

export {privateRoutes}