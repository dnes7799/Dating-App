import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import MainNotification from '../../components/private/notification/MainNotification'
import Groups from '../../components/private/group/Groups'
import SuggestedProfile from '../../components/private/SuggestedProfile'

export default function Notifications() {
  return (
    <Box sx={{}}>

      <Grid container>

        <Grid item xs={12} sm={7} md={8} >
          <MainNotification />
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            <Box sx={{p: 0.5}}>
              <Groups />
            </Box>

            <Box sx={{p: 0.5}}>
              <SuggestedProfile />
            </Box>

          </Box>
        </Grid>

      </Grid>
    </Box>
  )
}
