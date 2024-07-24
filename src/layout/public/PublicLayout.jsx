import { Box } from "@mui/material";
import Navbar from "../../components/public/Navbar/Navbar";

import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    return (
        <Box width='100%' height='100%'>
            <Navbar />
            <Outlet />
        </Box>
    );
}

export default PublicLayout;