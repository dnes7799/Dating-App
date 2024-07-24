import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { Box, Typography, styled, Button, Select, MenuItem, } from '@mui/material'

import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setAgeGroup } from '../../../reducers/updateProfileSlice';



const FlexCont = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))



export default function AgeGroupInterest({ onNext, dispatch, baseUrl, access_token }) {

  const ageGroup = useSelector(state => state.profile.ageGroup)
  const [ageGroupData, setAgeGroupData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  useEffect(() => {


      const fetchAgeGroup = async () => {
          try {
              const response = await axios.get(`${baseUrl}/api/v1/user/age_groups`)

              if (response?.data?.isSuccess) {
                  setAgeGroupData(response.data.responseData.ageGroups)
              }
          }
          catch (error) {
              console.error('catch block error', error)
          }

      }

      fetchAgeGroup()

  }, [])

  const handleNext = async () => {

      if (!ageGroup) {
          setError("Age group cannot be empty")
          return
      }

      try {
          setLoading(true)
          const response = await axios.patch(`${baseUrl}/api/v1/user/me/secondary_interests`, {
              age_group_id: ageGroup
          },
              {
                  headers: {
                      Authorization: `Bearer ${access_token}`
                  }
              })

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
          <Typography sx={{ fontSize: { xs: '24px', sm: '30px' }, fontFamily:'fontRegular' }}>
              What age group are you interested in?
          </Typography>
          <Typography textAlign='center'>
              You can select multiple age groups from the list
          </Typography>
          <Box component='form' sx={{ width: { xs: '90%', sm: '60%', md: '50%', lg: '40%' }, mt: 4 }}>

              <Select
                  fullWidth
                  size='small'

                  displayEmpty
                  value={ageGroup}
                  onChange={e => dispatch(setAgeGroup(e.target.value))}
                  sx={{ my: 1 }}
                  renderValue={(ageGroup) => {
                    if (!ageGroup) {
                        return <em style={{color: "#a3a3a3"}}>Select your interested age group</em>;
                    }

                    const ageGroupObject = ageGroupData.find(age => age.ID === ageGroup)

                    return ageGroupObject?.AgeGroup
                }}
              >
                  {ageGroupData && ageGroupData.map((age) => (
                      <MenuItem key={age.ID} value={age.ID}>{age.AgeGroup}</MenuItem>
                  ))}
              </Select>
          </Box>
          {error && error.length > 0 &&
              <Typography color='red'>
                  {error}
              </Typography>
          }

          <Button variant='contained' sx={{ mt: '5rem', width: { xs: '90%', sm: '60%', md: '50%', lg: '40%' }, borderRadius: '100px', backgroundColor: '#006BFA' }} onClick={handleNext}>
              {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}Next</Button>


      </FlexCont>
  )
}
