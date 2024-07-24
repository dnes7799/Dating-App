import React from 'react'
import { useGetLikedQuery } from '../../../../rtkmodules/user actions/userActionServices'
import { formatDistanceToNow } from 'date-fns'

import { Box, Typography } from '@mui/material'

export default function LikedUserModal() {

    const { data: likedData, isLoading: likedLoading } = useGetLikedQuery({    refetchOnMountOrArgChange: true,
    })

    console.log('liked user data list', likedData)

    return (
        <Box>
            {likedLoading
                ? "Loading... "
                : 
                <Box sx={{ overflowY: 'scroll' }}>
                    {likedData && likedData?.responseData?.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'row', mb: 1, gap: 1,  alignItems: 'center' }}>

                            <img src={item.profile_pic_url} style={{ borderRadius: '50%', width: '4rem', aspectRatio: 1 / 1, objectFit: 'cover' }} />

                            <Box>
                                <Typography sx={{fontWeight:'bold'}}>
                                    {item.username}
                                </Typography>
                                <Typography>
                                    Liked {formatDistanceToNow(item.action_done_on)} ago
                                </Typography>
                            </Box>
                        </Box>

                    ))}

                </Box>
            }
        </Box>
    )
}
