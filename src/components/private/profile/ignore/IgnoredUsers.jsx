import React, {useState, useEffect} from 'react'
import { Box, Button, Typography, useTheme, ThemeProvider } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useGetIgnoredQuery } from '../../../../rtkmodules/user actions/userActionServices';
import { formatDistanceToNow } from 'date-fns';

export default function IgnoredUsers({setUserActionModalOpen}) {
    const theme = useTheme()
    
    const [displayUsers, setDisplayUsers] = useState(null)

    const { data: ignoredData, isLoading: ignoredDataLoading } = useGetIgnoredQuery({
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {

        const newUsers = ignoredData?.responseData?.slice(0, 3)
        setDisplayUsers(newUsers)

    }, [ignoredData])

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
                        color: "#D92626"
                    }}>
                        <ClearIcon sx={{ color: '#D92626', fontSize: {sm:'1.1rem', lg:'1.2rem'}}} />
                        <Typography sx={{fontSize: {sm:'0.8rem', lg:'1rem'}}}>
                            Profiles Ignored
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
                {ignoredDataLoading ? 'Loading...' :
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
