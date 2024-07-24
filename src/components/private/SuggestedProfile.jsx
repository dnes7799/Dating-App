import { Box, useTheme, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import One from '../../assets/Memoji1.png'
import Two from '../../assets/Memoji2.png'

import Three from '../../assets/Memoji4.png'

import Four from '../../assets/Memoji5.png'

import Five from '../../assets/Memoji6.png'

import Six from '../../assets/Memoji7.png'


const profiles = [
    {
        name: 'John Cena',
        src: One,
        color: ""

    },
    {
        name: "CM Punk",
        src: Two
    },
    {
        name: "Leo Mess",
        src: Three
    },
    {
        name: "Leo Clean",
        src: Four
    },
    {
        name: "Cris Ron",
        src: Five
    },
    {
        name: "Cris Walk",
        src: Six
    },

]



export default function SuggestedProfile() {

    const theme = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    mt: 2, 
                    mr: '0.2rem',
                    p: 1,
                    backgroundColor: theme.palette.secondary.profile,
                    borderRadius:'10px',
              
                }} >
                <Typography sx={{ p: 0.5, mb: 1, color: theme.palette.secondary.text }}>
                    Suggested Profiles
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:'space-around', alignItems:'center', rowGap: 2 }}>
                    {profiles.map((profile, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexBasis: '33%', }}>
                            <Box sx={{ backgroundColor: profile.color }}>
                                <img src={profile.src} style={{ width: '90%', aspectRatio: 1 / 1 }} />
                            </Box>
                            <Typography sx={{ fontSize: { xs: '1rem', sm:'0.8rem', md:'1rem' } }}>
                                {profile.name}
                            </Typography>
                        </Box>
                    ))}

                </Box>
            </Box>
        </ThemeProvider>
    )
}
