import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, useTheme, ThemeProvider } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { formatDistanceToNow } from 'date-fns';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetViewedQuery } from '../../../../rtkmodules/user actions/userActionServices';


export default function ViewUsers({ setUserActionModalOpen }) {

    const theme = useTheme()

    const [displayUsers, setDisplayUsers] = useState(null)

    const { data: likedData, isLoading: likedLoading, isSuccess: likedSuccess } = useGetViewedQuery({
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {

        const newUsers = likedData?.responseData?.slice(0, 3)
        setDisplayUsers(newUsers)

    }, [likedData])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                backgroundColor: theme.palette.background.default,
                p: 0.5,
                borderRadius: '10px'
            }}>
                <Box sx={{
                    px: 0.5,
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
                        <VisibilityIcon sx={{ color: 'inherit', fontSize: { sm: '1.1rem', lg: '1.2rem' } }} />
                        <Typography sx={{ fontSize: { sm: '0.8rem', lg: '1rem' } }}>
                            Profiles Viewed
                        </Typography>
                    </Box>
                    <Button onClick={() => {
                        setUserActionModalOpen(true)
                    }}
                        sx={{
                            textTransform: "none",
                            color: theme.palette.secondary.view,
                            fontSize: { sm: '0.8rem', lg: '1rem' }.lg,

                        }}>
                        View All
                        <ArrowDownwardIcon sx={{
                            ml: 0.5,
                            color: theme.palette.secondary.view,
                            fontSize: { sm: '1.1rem', lg: '1.2rem' }
                        }} />
                    </Button>
                </Box>

                {likedLoading ? 'Loading...' :
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
        </ThemeProvider>
    )
}
