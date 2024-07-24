import React from 'react'

import { Box, Typography, Button, useTheme, ThemeProvider, IconButton } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function AccountSettings() {

  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2 }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          Account Settings
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            De-activate account
          </Typography>
          <Typography sx={{ mt: 0.5, color: theme.palette.secondary.text }}>
            You can temporarily deactivate your account. Your profile will be hidden from walls. Your sent messages will still be accessible by other users.
          </Typography>
          <Button sx={{
            textTransform: 'none',
            mt: 1,
            p: 0.5,
            color: theme.palette.primary.light
          }}>
            De-activate
            <ArrowForwardIosIcon sx={{ color: theme.palette.primary.light, fontSize: "1rem", ml: 0.5 }} />
          </Button>

        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            Delete account
          </Typography>
          <Typography sx={{ mt: 0.5, color: theme.palette.secondary.text }}>
            You can delete your account.
          </Typography>
          <Button sx={{
            textTransform: 'none',
            mt: 1,
            p: 0.5,
            color: '#ff2b2b'
          }}>
            Delete Account
            <ArrowForwardIosIcon sx={{ color: '#ff2b2b', fontSize: "1rem", ml: 0.5 }} />
          </Button>

        </Box>



      </Box>
    </ThemeProvider>
  )
}
