import React, { useEffect } from 'react'
import { Box, Typography, Switch } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useDispatch, useSelector } from 'react-redux'
import { setMode, setDarkMode } from '../../../state'

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '200ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#4365A7' : '#4365A7',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


export default function ChangeTheme() {
  
  const dispatch = useDispatch()

  const darkMode = useSelector(state => state.global.darkMode)

  //const [checked, setChecked] = React.useState(false);

  const handleChange = () => {

    dispatch(setDarkMode(!darkMode))
    dispatch(setMode())
    
    
  };

  // useEffect(() => {

  //     dispatch(setMode())
    

  // }, [checked])

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h5' sx={{}}>
        Theme
      </Typography>
      <Typography mt={1}>
        Choose a theme for your app
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
        <Typography>
          Dark Theme
        </Typography>
        <IOSSwitch
          checked={darkMode}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />

      </Box>

    </Box>
  )
}
