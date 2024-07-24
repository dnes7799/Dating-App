import React from 'react'
import { useGetFavoritedQuery } from '../../../../rtkmodules/user actions/userActionServices'
import { formatDistanceToNow } from 'date-fns'

import { Box, Typography } from '@mui/material'
export default function FavoritedUserModal() {

    const { data: favoritedData, isLoading: favoritedDataLoading } = useGetFavoritedQuery({
        refetchOnMountOrArgChange: true,
    })


    return (
        <Box>
            {favoritedDataLoading
                ? "Loading... "
                :
                <Box sx={{ overflowY: 'scroll' }}>
                    {favoritedData && favoritedData?.responseData?.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'row', mb: 1, gap: 1, alignItems: 'center' }}>
                            <img src={item.profile_pic_url} style={{ borderRadius: '50%', width: '4rem', aspectRatio: 1 / 1, objectFit: 'cover' }} />

                            <Box>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    {item.username}
                                </Typography>
                                <Typography>
                                    Favorited {formatDistanceToNow(item.action_done_on)} ago
                                </Typography>
                            </Box>
                        </Box>

                    ))}

                </Box>
            }
        </Box>
    )
}
