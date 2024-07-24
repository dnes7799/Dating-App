import React, { useState } from 'react'
import { Box, Typography, CircularProgress, TextField, Button } from '@mui/material'
import swal from 'sweetalert'
import {useSelector} from 'react-redux'
import axios from 'axios'

export default function ChangePassword() {
  const baseUrl = useSelector(state => state.global.baseUrl)
  const access_token = localStorage.getItem('access_token')
  const [loading, setLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleResetPasswordSubmit = async (e) => {

    e.preventDefault()

    if (!currentPassword || !newPassword || !confirmPassword) {
      swal({
        icon: 'error',
        text: "All fields are required"
      })
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(`${baseUrl}/api/v1/user/me/reset_password`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmPassword
        },
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,

          }
        }
      )


      if (response.data.isSuccess) {
        swal({
          icon: "success",
          text: "Your password has been reset."
        })
        localStorage.setItem('access_token', response.data.responseData.access_token)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }

      setLoading(false)
    }
    catch (error) {
      swal({
        icon: "error",
        text: error.response.data.message
      })
      setLoading(false)
      console.error(error)
    }
  }


  return (

    <Box component='form' onSubmit={handleResetPasswordSubmit}
      sx={{
        width: {xs: '100%', sm:'80%', md:'60%', lg:'40%'},
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
      <Typography sx={{ fontSize: { xs: "18px", sm: '20px', md: '24px' } }}>

        Reset Your Password
      </Typography>
      <TextField
        required
        size='small'
        placeholder='Current Password'
        type='password'
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}

      />

      <TextField
        required
        size='small'
        placeholder='New Password'
        type='password'
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />

      <TextField
        required
        size='small'
        placeholder='Confirm New Password'
        type='password'
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ textTransform: 'none', fontSize: '16px' }}>
        {loading ? <CircularProgress size='1.5rem' color="inherit" sx={{ mr: 1 }} /> : null} Reset
      </Button>
    </Box>
  )
}
