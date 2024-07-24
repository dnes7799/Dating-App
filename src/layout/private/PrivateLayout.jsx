import * as React from 'react';
//MUI Components
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { useMediaQuery } from '@mui/material';


//icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import Settings from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import LightModeIcon from '@mui/icons-material/LightMode';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

//functions
import Logo from '../../assets/Logo.svg'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';

// import { setMode } from '../../state';
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';

import { useGetProfileQuery } from '../../rtkmodules/profile/profileServices';
import { useGetPhotosQuery } from '../../rtkmodules/photos/photosServices';
import { useSelector } from 'react-redux';
import { setGroupSelected, setHistory, setUserSelected } from '../../reducers/messageSlice';

import socket from '../../socket';

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const navList = [
  {
    label: "Home",
    path: '/home',
    icon: <HomeIcon />
  },
  {
    label: "Search",
    path: "/search",
    icon: <SearchIcon />
  },
  {
    label: "Messages",
    path: "/messages",
    icon: <MessageIcon />

  },
  {
    label: "Groups",
    path: "/groups",
    icon: <GroupIcon />

  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: <NotificationsIcon />

  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <Settings />

  },
  {
    label: "Profile",
    path: "/profile",
    icon: <PersonIcon />

  },
  // {
  //   label: "Views",
  //   path: '/views',
  //   icon: <VisibilityIcon />
  // }

]

const bottomNavList = [
  {
    label: "Home",
    path: '/home',
    icon: <HomeIcon />
  },
  {
    label: "Messages",
    path: "/messages",
    icon: <MessageIcon />

  },
  {
    label: "Search",
    path: "/search",
    icon: <SearchIcon />
  },

  {
    label: "Groups",
    path: "/groups",
    icon: <GroupIcon />

  },
  {
    label: "Profile",
    path: "/profile",
    icon: <PersonIcon />

  },
]

export default function PrivateLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [fetchedImages, setFetchedImages] = React.useState([])

  const location = useLocation()
  const dispatch = useDispatch()
  const [navValue, setNavValue] = React.useState(() => {
    const currentLabel = bottomNavList.find((item) => item.path === location.pathname)?.label
    return currentLabel

  })
  const [activeLink, setActiveLink] = React.useState(navList[0].label)

  const navigate = useNavigate()
  const showBottomNav = useSelector(state => state.global.showBottomNav)
  const auth = useContext(AuthContext)
  const access_token = localStorage.getItem('access_token')

  const min600 = useMediaQuery('(min-width: 600px)')

  const { data: profileData, loading: profileLoading } = useGetProfileQuery()


  console.log({showBottomNav})

  const handleDrawerOpen = () => {
    if (min600) {
      setOpen(true);
    }
    else (
      setOpen(false)
    )

  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {

    if (!min600) {
      setOpen(false);
    }


  }, [min600])

  const authValues = React.useContext(AuthContext)

  React.useEffect(() => {

    if (!authValues.isLoggedIn) {
      navigate('/login')

    }
    else {
      const token = access_token

      console.log("token after page refresh", token)
      socket.auth = { token };
      socket.connect();
    }

  }, [])

  React.useEffect(() => {
    if (access_token) {
      try {
        const decodedToken = JSON.parse(atob(access_token.split(".")[1]));

        if (decodedToken.exp * 1000 < Date.now()) {

          auth.logout();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }

    } else {
      console.error("Access token is null or undefined");
    }
  });

  React.useEffect(() => {

    if (profileLoading) {
      return "Loading... "
    }


    if (profileData) {
      if (profileData?.responseData?.username?.length === 0
        || profileData?.responseData?.birthday?.length === 0
        || !profileData?.responseData?.pronoun_id
        || !profileData?.responseData?.race_id
        || profileData?.responseData?.height?.length === 0
        || profileData?.responseData?.weight?.length === 0
      ) {
        navigate('/update-profile')

      }
    }
    // else {
    //   const fetchImages = async () => {
    //     const response = await fetch(`${baseUrl}/api/v1/user/me/pictures`, {
    //       headers: {
    //         'Authorization': `Bearer ${access_token}`
    //       }
    //     })
    //     const json = await response.json()
    //     if (json.isSuccess) {
    //       setFetchedImages(json?.responseData?.pictures)
    //     }
    //   }
    //   fetchImages()
    // }




  }, [profileData, profileLoading])

  React.useEffect(() => {

    const currentLabel = navList.find((item) => item.path === location.pathname)?.label
    setActiveLink(currentLabel)

  }, [location.pathname, navList])

  const handleLinkClick = (label) => {
    setActiveLink(label)
   // dispatch(setHistory([]))
    dispatch(setUserSelected(''))
    dispatch(setGroupSelected(''))
  }


  return (
    <Box sx={{ display: { xs: 'block', sm: 'flex' } }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}
        sx={{
          display: { xs: "none", sm: 'block' },

          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.background.default
          }

        }}>
        <DrawerHeader >
          {open ?
            <Box sx={{ width: '100%', p: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Box>
                <img src={Logo} style={{ width: '80px' }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold', color: theme.palette.primary.light }}>
                  SG
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </Box>
            </Box>
            :
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <IconButton
                color="inherit"
                onClick={handleDrawerOpen}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minWidth: 0
                }}
              >
                <MenuIcon sx={{ color: theme.palette.primary }} />
              </IconButton>
            </Box>


          }
        </DrawerHeader>
        <List sx={{

        }}>
          {navList.map((item, index) => (
            <ListItem key={index} disablePadding component={Link} to={item.path} onClick={() => handleLinkClick(item.label)}
              sx={{
                display: 'block',


              }} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: theme.palette.primary.light
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: activeLink === item.label ? theme.palette.primary.light : theme.palette.secondary.main
                  }}
                >
                  {item.icon}

                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: activeLink === item.label ? theme.palette.primary.light : theme.palette.secondary.main,
                    '& .MuiTypography-root': {
                      fontSize: '1.3rem'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>




      <Box component="main" sx={{ flexGrow: 1, mb: { xs: 0, sm: 0 } }}>
        <Outlet />
      </Box>
      {showBottomNav ?
        <Box>
          <BottomNavigation value={navValue} onChange={(e, newValue) => setNavValue(newValue)}
            sx={{
              display: { xs: 'flex', sm: 'none' },
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              height: 'auto',
              position: 'fixed',
              bottom: 0,
              borderRadius: '8px 8px 0 0',
              boxShadow: '0px -1px 3px 0px rgba(0, 0, 0, 0.12)',

            }}>
            {bottomNavList.map((nav) => (
              <BottomNavigationAction key={nav.label} component={Link} to={nav.path} onClick={() => handleLinkClick(nav.label)}
                label={nav.label}
                value={nav.label}
                icon={nav.icon}
                sx={{
                  px: '1rem',
                  minWidth: 0,
                  maxWidth: 0,
                  color: theme.palette.secondary.main,
                  '&.Mui-selected': {
                    color: theme.palette.primary.light,

                  }

                }}

              />
            ))}

          </BottomNavigation>
        </Box>
        : null
      }
    </Box >
  );
}
