import React, {useState, useEffect} from 'react'
import { Box, Button, Typography, useTheme, ThemeProvider } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { formatDistanceToNow } from 'date-fns';
import { useGetFavoritedQuery } from '../../../../rtkmodules/user actions/userActionServices';

export default function FavoritedUsers({setUserActionModalOpen}) {

    const theme = useTheme()

    const [displayUsers, setDisplayUsers] = useState(null)
    const {data: favoriteData, isLoading: favoriteDataLoading} = useGetFavoritedQuery()

    useEffect(() => {

        const newUsers = favoriteData?.responseData?.slice(0,3)

        setDisplayUsers(newUsers)

    }, [favoriteData])

    return (
        <ThemeProvider theme={theme}>
            <Box  sx={{
                backgroundColor: theme.palette.background.default,
                p: 0.5,
                borderRadius: '10px'
            }}>
                <Box sx={{
                    px:0.5,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 0.7,
                    mb: 1,
                    color: theme.palette.secondary.main,
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 0.7,

                    }}>
                        <BookmarkIcon sx={{ color: theme.palette.neutral.main, fontSize: {sm:'1.1rem', lg:'1.2rem'} }} />
                        <Typography sx={{fontSize: {sm:'0.8rem', lg:'1rem'}}}>
                            Profiles Favorited
                        </Typography>
                    </Box>
                    <Button onClick={() => setUserActionModalOpen(true)}
                     sx={{
                        textTransform: "none",
                        color: theme.palette.secondary.view,
                        fontSize: {sm:'0.8rem', lg:'1rem'}
                    }}>
                        View All
                        <ArrowDownwardIcon sx={{
                            ml: 0.5,
                            color: theme.palette.secondary.view,
                            fontSize: {sm:'1.1rem', lg:'1.2rem'}
                        }} />
                    </Button>
                </Box>

                <Box>
               
                {favoriteDataLoading ? 'Loading...' :
                    displayUsers?.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'row', mb: 1, gap: 1, alignItems: 'center' }}>
                            <img src={item.profile_pic_url} style={{ borderRadius: '50%', width: '3.5rem', aspectRatio: 1 / 1, objectFit: 'cover' }} />

                            <Box>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    {item.username}
                                </Typography>
                                <Typography>
                                {formatDistanceToNow(item.action_done_on)} ago
                                </Typography>
                            </Box>
                        </Box>

                    ))}
                </Box>

            </Box>
        </ThemeProvider>
    )
}
