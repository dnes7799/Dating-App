import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import UserProfile from '../../components/private/profile/UserProfile'
import Photos from '../../components/private/profile/Photos'
import Views from '../../components/private/profile/Views'
import AllTab from '../../components/private/profile/AllTab'

export default function Profile() {


  return (
    <Grid container spacing={0}>

      <Grid item xs={12} sm={3} md={3} lg={3.5}>
        <UserProfile />
      </Grid>

      <Grid item xs={12} sm={6} md={5.5} lg={5.5} sx={{px: 1}}>
        <Photos />
      </Grid>

      <Grid item xs={12} sm={3} md={3.5} lg={3}>
        <Views />
      </Grid>


    </Grid>
  )
}
