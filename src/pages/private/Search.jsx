import { Box, TextField, Typography, InputAdornment, ThemeProvider, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import React from 'react'

export default function Search() {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Box p={3}>
        <Typography sx={{ fontSize: { xs: "1.5rem", sm: '1.8rem', md: "2rem", lg: '2.5rem' }, fontFamily:'fontRegular' }}>
          Search
        </Typography>
        <Typography>
          Search for user profiles here
        </Typography>

        <Box sx={{ mt: { xs: 2, sm: 5, }, width: { xs: '100%', sm: '80%', md: " 60%" } }}>
          <TextField
            fullWidth
            size='small'
            placeholder='Search'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}

            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: '#B2BAC2',
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.secondary.main,
                },
            },
             
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '100px',
                borderColor: theme.palette.secondary.main
              },
              
              "&.Mui-focused .MuiOutlinedInput-notchedOutline":{
                borderColor: '#red'

              },
              '& .MuiOutlinedInput-input':{
                color: theme.palette.secondary.main
              }

            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
