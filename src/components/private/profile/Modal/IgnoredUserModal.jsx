import React from 'react'
import { useGetIgnoredQuery } from '../../../../rtkmodules/user actions/userActionServices'
import { formatDistanceToNow } from 'date-fns'

import { Box, Typography } from '@mui/material'
export default function IgnoredUserModal() {

    const { data: ignoredData, isLoading: ignoredDataLoading } = useGetIgnoredQuery({
        refetchOnMountOrArgChange: true,
    })


    return (
        <Box>
            {ignoredDataLoading
                ? "Loading... "
                :
                <Box sx={{ overflowY: 'scroll' }}>
                    {ignoredData && ignoredData?.responseData?.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'row', mb: 1, gap: 1, alignItems: 'center' }}>
                            <img src={item.profile_pic_url} style={{ borderRadius: '50%', width: '4rem', aspectRatio: 1 / 1, objectFit: 'cover' }} />

                            <Box>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    {item.username}
                                </Typography>
                                <Typography>
                                    Ignored {formatDistanceToNow(item.action_done_on)} ago
                                </Typography>
                            </Box>
                        </Box>

                    ))}

                </Box>
            }
        </Box>
    )
}
