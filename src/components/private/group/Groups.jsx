//react
import React from 'react'

//mui components
import { Box, IconButton, Typography, useTheme, ThemeProvider } from '@mui/material'

//assets import
import GroupIcon from '../../../assets/GroupIcon.svg'
import LightGroupIcon from '../../../assets/LightGroupIcon.svg'
import GroupImage1 from '../../../assets/GroupImage1.png'
import GroupImage2 from '../../../assets/GroupImage2.png'
import GroupImage3 from '../../../assets/GroupImage3.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const groupList = [
    {
        img: GroupImage1,
        title: "Lesbains Yayy",
        lastSender: "Anurag Limbu",
        lastMessage: 'Hey there babe, wanna hang out?',
        online: true,
        color: '#EFF7E6'
    },
    {
        img: GroupImage2,
        title: "Queer R Queens",
        lastSender: "Aadarsha Lamichhane",
        lastMessage: 'Who messed with us?',
        online: true,
        color: '#E6EEF7'
    },
    {
        img: GroupImage3,
        title: "Bi FI",
        lastSender: "UniqueKtiMoh",
        lastMessage: 'I think there\'s no such thing as bi fi',
        online: false,
        color: '#F7E6E6'
    },
]

export default function Groups() {

    const mode = useSelector(state => state.global.mode)

    const theme = useTheme()

    const navigate = useNavigate()

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{mt: 2, p: 2, mr: '0.2rem', backgroundColor: theme.palette.secondary.profile, borderRadius: '10px' }} >

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton onClick={() => navigate('/groups')} >
                        {mode === 'dark' ? <img src={GroupIcon} /> : <img src={LightGroupIcon} />}
                    </IconButton>

                    <Typography>
                        Groups
                    </Typography>
                </Box>
                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', rowGap: 1 }}>

                    {groupList && groupList.map((group, index) => (

                        <Box key={index}
                        
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                            p: '0.5rem',
                            backgroundColor: group.color,
                            borderRadius: '8px',
                            '&:hover':{
                                cursor:'pointer',
                                transform: 'scale(1.01)',
                                transition: '0.2s transform',
                            }
                        }}>

                            <Box sx={{}}>
                                <img src={group.img} />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                    <Typography sx={{ color: "#000" }}>
                                        {group.title}
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: group.online ? 'green' : 'grey'
                                        }}
                                    />

                                </Box>

                                <Box>
                                    <Typography sx={{ fontWeight: 'bold', color: "#000" }}>
                                        {group.lastSender}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography sx={{ color: "#000" }}>
                                        {group.lastMessage}
                                    </Typography>
                                </Box>

                            </Box>

                        </Box>

                    ))}
                </Box>


            </Box>
        </ThemeProvider>
    )
}
