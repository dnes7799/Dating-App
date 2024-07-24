import React from 'react'
import { Box, Typography, Divider, List, ListItemButton, ListItem, IconButton, ListItemText, Grid } from '@mui/material'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';


import { useSelector } from 'react-redux'

const profileDetails = [
    {
        icons: <PersonOutlineOutlinedIcon />,
        text: "View Profile"
    },
    {
        icons: <FavoriteBorderOutlinedIcon />,
        text: "Likes"
    },
    {
        icons: <BookmarkBorderOutlinedIcon />,
        text: "Add to Favorites"
    },
]

export default function ProfileDetails() {
    const name = useSelector(state => state.message.username)
    const avatar = useSelector(state => state.message.avatar)
    const attachments = useSelector(state => state.message.attachments)

    return (
        <Box>
            <Box sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={avatar} style={{ width: '120px', aspectRatio: 1 / 1 }} />
                </Box>
                <Typography sx={{ mt: 0.5, fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }} >
                    {name}
                </Typography>
            </Box>

            <Divider sx={{ mt: 1 }} />

            <Box sx={{ pt: 1 }}>

                {profileDetails.map((item) => (
                    <List key={item.text} disablePadding >
                        <ListItemButton sx={{ p: 0, }}>
                            <IconButton sx={{ minWidth: '50px' }}>
                                {item.icons}
                            </IconButton>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </List>
                ))}

            </Box>
            <Box sx={{ mt: 2, mx: 2 }}>
                <Typography>
                    Attachments
                </Typography>
                <Box sx={{display:'flex', gap: 1, justifyContent:'flex-start', alignItems:'center', flexWrap:'wrap'}}>

                    {attachments && attachments.map((image) => (
                        <Box key={image}
                            sx={{
                                borderRadius: '8px'
                            }}
                        >

                            <img src={image} style={{ width: '120px', height: '105px', borderRadius: '8px' }} />

                        </Box>
                    ))}

                </Box>
            </Box>

        </Box>
    )
}
