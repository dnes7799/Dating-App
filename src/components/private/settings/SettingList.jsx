import React from 'react'
import { AuthContext } from '../../../context/authContext';
import { useContext } from 'react';

import { Box, Typography, TextField, InputAdornment, useTheme, ThemeProvider, ListItemButton, ListItem, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { Logout } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faCircleHalfStroke, faGear, faLock, faGem } from '@fortawesome/free-solid-svg-icons';

const settingsLabel = [
    // {
    //     label: "Edit Profile",
    //     icon: faPenToSquare,
    // },
    {
        label: "Change Theme",
        icon: faCircleHalfStroke,
    },
    {
        label: "Account Settings",
        icon: faGear,
    },
    {
        label: "Change Password",
        icon: faLock,
    },
    {
        label: "Premium",
        icon: faGem,
    },
]

export default function SettingList({ activeSetting, setActiveSetting }) {
    const theme = useTheme()
    const auth = useContext(AuthContext)

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                height: '100vh',
                display: "flex",
                flexDirection: 'column',
                backgroundColor: theme.palette.background.setting,
                p: 2
            }}>

                <Box sx={{ px: 2 }}>
                    <Typography sx={{ fontSize: { xs: '24px', sm: '30px' }, fontFamily: 'fontRegular' }}>
                        Settings
                    </Typography>
                    <Typography sx={{ mt: 1, fontSize: '18px' }}>
                        Manage the way your app feels
                    </Typography>

                    <TextField fullWidth
                        size='small'
                        placeholder='Search'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}

                        sx={{
                            mt: 4,
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#B2BAC2',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '100px',
                                borderColor: theme.palette.secondary.main,
                            },

                            '& .MuiOutlinedInput-input': {
                                color: theme.palette.secondary.main,

                            },

                        }}
                    />
                </Box>

                <Box sx={{ mt: 2 }} >
                    {settingsLabel.map((setting) => (

                        <ListItem key={setting.label} sx={{ p: 1 }}>
                            <ListItemButton onClick={() => setActiveSetting(setting.label)}
                                sx={{
                                    p: 1,
                                    borderRadius: "8px",
                                    backgroundColor: theme.palette.background.settingList,
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                    justifyContent: "flex-start",
                                    border: activeSetting === setting.label ? `1px solid ${theme.palette.primary.light}` : 'none'
                                }}>

                                <IconButton>
                                    <FontAwesomeIcon icon={setting.icon} color={activeSetting === setting.label ? theme.palette.primary.light : theme.palette.secondary.settingIcon} />
                                </IconButton>

                                <Typography sx={{ fontSize: "1.1rem", color: activeSetting === setting.label ? theme.palette.primary.light : theme.palette.secondary.settingIcon }}>
                                    {setting.label}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem sx={{ p: 1 }}>
                        <ListItemButton onClick={() => auth.logout()}
                        sx={{
                            p: 1,
                            borderRadius: "8px",
                            backgroundColor: theme.palette.background.settingList,
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                            justifyContent: "flex-start"
                        }}>
                            <IconButton>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} color='#ff2b2b' />
                            </IconButton>
                            <Typography sx={{ fontSize: "1.2rem", color: '#ff2b2b'}}>
                                Logout
                            </Typography>
                        </ListItemButton>

                    </ListItem>
                </Box>

            </Box>
        </ThemeProvider>

    )
}
