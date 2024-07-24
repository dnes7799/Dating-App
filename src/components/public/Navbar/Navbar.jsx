import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';

import Logo from '../../../assets/Logo.svg'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const navItems = [
    // {
    //     label: 'Home',
    //     path: '/'
    // },
    // {
    //     label: 'About Us',
    //     path: '/about'
    // },
    // {
    //     label: "Plans",
    //     path: '/plans'
    // },
    // {
    //     label: "Download",
    //     path: "/download"
    // },
    // {
    //     label: "Support",
    //     path: "/support"
    // },

];

import { createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: '#707070',
                    textAlign: 'left',
                    padding: '0.8rem',
                    '&:hover': {
                        backgroundColor: '#D9D9D9',
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none'
                }
            }
        }
    }
})

function Navbar() {

    const isBelow600px = useMediaQuery("(max-width: 600px)");

    //const [activeLink, setActiveLink] = React.useState(navItems[0].label)
    const [mobileOpen, setMobileOpen] = React.useState(false);
    //const location = useLocation()

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle}>
            <Box>
                <img src={Logo} style={{ width: '80px' }} />
            </Box>

            <Divider />
            <List>
                {/* {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'left' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
                <ListItem disablePadding>
                    <ListItemButton component={Link} to='/login' sx={{ textAlign: 'left' }}>
                        <ListItemText primary='Login' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to='/signup' sx={{ textAlign: 'left' }}>
                        <ListItemText primary='Signup' />
                    </ListItemButton>
                </ListItem>


            </List>
        </Box>
    );

    // React.useEffect(() => {

    //     const currentLabel = navItems.find((item) => item.path === location.pathname)?.label
    //     setActiveLink(currentLabel )

    // }, [location.pathname, navItems])

    // const handleLinkClick = (label) => {
    //     setActiveLink(label)
    // }


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', }}>
                <CssBaseline />
                <AppBar component="nav" sx={{ backgroundColor: 'white' }}>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: { xs: 'space-between', sm: 'space-around' },
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    }}>

                        <Box p={0.5} ml={1} component={Link} to='/'>
                            <img src={Logo} style={{ width: isBelow600px ? '80px' : '120px' }} />
                        </Box>

                        <Box>
                            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'row', padding: 1 , gap: 2}}>

                                {/* {navItems.map((item) => (
                                    <Typography key={item.label} component={Link} to={item.path} onClick={() => handleLinkClick(item.label)}

                                        sx={{
                                            textTransform: 'none',
                                            color: activeLink === item.label ? '#006BFA' : '#4D4D4D',
                                            textDecoration: 'none',
                                            p: 1,
                                            '&:hover': {
                                                color: "#006BFA"
                                            }


                                        }}>
                                        {item.label}
                                    </Typography>
                                ))} */}
                                <Button component={Link} to='/login' variant='outlined'
                                    sx={{
                                        textTransform: 'none',
                                        width: { xs: '50px', sm: '100px' },
                                        height:'auto',
                                        borderRadius: '100px',
                                        borderColor: "#006BFA",
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        ml: 2
                                    }}
                                >
                                    <PersonOutlinedIcon sx={{ color: '#006BFA' }} />
                                    <Typography color='#006BFA'>
                                        Login
                                    </Typography>
                                </Button>

                                <Button component={Link} to='/signup' variant='contained' 
                                    sx={{
                                        textTransform: 'none',
                                        width: '120px',
                                        height: '50px',
                                        borderRadius: '100px',
                                        color: "#fff" ,
                                        backgroundColor: "#006BFA",
                                    }}
                                >
                                    <Typography color='#fff' >
                                        Register
                                    </Typography>
                                </Button>


                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <IconButton
                                    color="black"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={handleDrawerToggle}
                                    sx={{ mr: 1, display: { xs: 'block', sm: 'none', }, '&:hover': { backgroundColor: 'none' } }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </Box>


                    </Toolbar>

                </AppBar>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" height='90px' className='toolbar-div'>
                    <Toolbar />
                </Box>

            </Box>
        </ThemeProvider>
    );
}

export default Navbar;