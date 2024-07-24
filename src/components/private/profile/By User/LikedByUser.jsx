import React from 'react'
import { useGetLikedByQuery } from '../../../../rtkmodules/user actions/userActionServices'
import { formatDistanceToNow } from 'date-fns'

import { Box, Typography } from '@mui/material'

export default function LikedByUserModal() {

    const { data: likedByUserData, isLoading: likedByUserDataLoading } = useGetLikedByQuery({
        refetchOnMountOrArgChange: true,
    })


    return (
        <Box>
            {likedByUserDataLoading
                ? "Loading... "
                :
                <Box sx={{ overflowY: 'scroll' }}>
                    {likedByUserData && likedByUserData?.responseData?.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'row', mb: 1, gap: 1, alignItems: 'center' }}>

                            <img src={item.profile_pic_url} style={{ borderRadius: '50%', width: '4rem', aspectRatio: 1 / 1, objectFit: 'cover' }} />

                            <Box>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Liked by    {item.username}
                                </Typography>
                                <Typography>
                                    {formatDistanceToNow(item.action_done_on)} ago
                                </Typography>
                            </Box>
                        </Box>

                    ))}

                </Box>
            }
        </Box>
    )
}
