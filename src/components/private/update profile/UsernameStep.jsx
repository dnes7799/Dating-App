import React, { useState, } from 'react'
import axios from 'axios';

import { setUserName } from '../../../reducers/updateProfileSlice'
import { useSelector, } from 'react-redux';
import { Box, Typography, styled, TextField, Button, } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';


const FlexCont = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

export default function UsernameStep({ onNext, dispatch, baseUrl, access_token }) {

  const [error, setError] = useState('')

  const userName = useSelector(state => state.profile.userName)
  const [loading, setLoading] = useState(false)


  const handleNext = async () => {

      if (userName.length === 0) {
          setError('Username is required')
          return
      }

      try {
          setLoading(true)

          const response = await axios.patch(`${baseUrl}/api/v1/user/me`,
              {
                  username: userName
              },
              {
                  headers: {
                      Authorization: `Bearer ${access_token}`
                  }
              })

          console.log(response)
          if (response.data.isSuccess) {

              onNext()
          }

          setLoading(false)

      } catch (error) {
          setLoading(false)
          console.error(error)
      }

  }


  return (
      <FlexCont sx={{ flexDirection: 'column', width: '100%' }}>
          <Typography sx={{ fontSize: { xs: '24px', sm: '30px' }, fontFamily:"fontRegular" }}>
              Input your username
          </Typography>
          <Box component='form' sx={{ width: {  xs: '90%', sm: '60%', md:'50%',  lg: '40%' }, mt: 4 }}>
              <TextField
                  required
                  fullWidth
                  size='small'
                  placeholder='Enter your username'
                  value={userName}
                  onChange={e => dispatch(setUserName(e.target.value))}
              />
          </Box>
          {error && error.length > 0 &&
              <Typography color='red'>
                  {error}
              </Typography>
          }

          <Button type='submit' variant='contained' sx={{ mt: '5rem', width: { xs: '90%', sm: '60%', md: '50%', lg: '40%' }, borderRadius: '100px', backgroundColor: '#006BFA' }} onClick={handleNext}>
              {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}
              Next</Button>

      </FlexCont>
  );
}