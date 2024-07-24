import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography, IconButton } from '@mui/material'
import SettingList from '../../components/private/settings/SettingList'
import EditProfile from '../../components/private/settings/EditProfile'
import ChangeTheme from '../../components/private/settings/ChangeTheme'
import AccountSettings from '../../components/private/settings/AccountSettings'
import ChangePassword from '../../components/private/settings/ChangePassword'
import Premium from '../../components/private/settings/Premium'
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Settings() {

    const navigate = useNavigate()
    const isAbove600 = useMediaQuery('(min-width:600px)');
    const [activeSetting, setActiveSetting] = useState(null)

    // useEffect(() => {

    //     console.log('above 600', isAbove600)

    // }, [isAbove600])

    const handleBack = () => {
        setActiveSetting(null)
    }


    return (
        <Grid container>
            <Grid item xs={12} sm={5} lg={4} sx={{ display: !isAbove600 && activeSetting === null ? 'grid' : isAbove600 ? 'grid' : 'none' }}>
                <SettingList activeSetting={activeSetting} setActiveSetting={setActiveSetting} />
            </Grid>
            <Grid item xs={12} sm={7} lg={8} sx={{p: 1,  display: !isAbove600 && activeSetting !== null ? 'grid' : isAbove600 ? 'grid' : 'none' }}>

                <Box sx={{display:{xs:'flex', sm:'none'}, alignItems:'center', }}>
                    <IconButton onClick={handleBack}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>

                {
                    // activeSetting === 'Edit Profile' ? <EditProfile />
                    // : 
                    activeSetting === 'Change Theme' ? <ChangeTheme />
                        : activeSetting === 'Account Settings' ? <AccountSettings />
                            : activeSetting === 'Change Password' ? <ChangePassword />
                                : activeSetting === 'Premium' ? <Premium />
                                    : null
                }
            </Grid>
        </Grid>
    )
}
