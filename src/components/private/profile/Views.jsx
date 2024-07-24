import React, { useState } from 'react'

import { Box, useTheme, ThemeProvider } from '@mui/material'

import LikedUsers from './likes/LikedUsers'
import FavoritedUsers from './favorites/FavoritedUsers'
import IgnoredUsers from './ignore/IgnoredUsers'
import UserActionModal from './Modal/UserActionModal'
import ViewUsers from './view/ViewUsers'


export default function Views() {
    const theme = useTheme()

    const [userActionModalOpen, setUserActionModalOpen] = useState(false)

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: "flex",
                flexDirection: 'column',
                p: 2,
                backgroundColor: theme.palette.secondary.profile,
                height: '100vh',
                rowGap: 2,
            }}>
                <UserActionModal userActionModalOpen = {userActionModalOpen}  setUserActionModalOpen={setUserActionModalOpen} />
                <ViewUsers setUserActionModalOpen={setUserActionModalOpen} />
                <LikedUsers setUserActionModalOpen={setUserActionModalOpen} />
                <FavoritedUsers setUserActionModalOpen={setUserActionModalOpen} />
                <IgnoredUsers setUserActionModalOpen={setUserActionModalOpen} />

            </Box>
        </ThemeProvider>
    )
}
