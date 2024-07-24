import React, { useEffect, useCallback, useState, useContext } from 'react'
import axios from 'axios';
import { Box, Typography,Button, Select, MenuItem, styled} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import {  setPronoun } from '../../../reducers/updateProfileSlice';


const FlexCont = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

export default function PronounStep({ onNext, dispatch, baseUrl, access_token }) {

  const [pronounList, setPronounList] = useState([])
  const [error, setError] = useState('')

  const pronoun = useSelector(state => state.profile.pronoun)
  console.log(pronoun)

  console.log('pronoun access token', access_token)

  const [loading, setLoading] = useState(false)

  useEffect(() => {

      const fetchPronoun = async () => {

          const response = await axios.get(`${baseUrl}/api/v1/user/pronouns`)

          if (response.data.isSuccess) {
              setPronounList(response.data.responseData.pronouns)
          }

      }

      fetchPronoun()

  }, [])

  const handleNext = async () => {

      if (pronoun.length === 0) {
          setError('Pronoun is required')
          return
      }

      try {
          setLoading(true)

          const response = await axios.patch(`${baseUrl}/api/v1/user/me`,
              {
                  pronoun_id: pronoun
              },
              {
                  headers: {
                      Authorization: `Bearer ${access_token}`
                  }
              }
          )

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
              Select your pronoun
          </Typography>
          <Box component='form' sx={{ width: { xs: '90%', sm: '60%', md: '50%', lg: '40%' }, mt: 4 }}>
              <Select
                  fullWidth
                  size='small'
                  displayEmpty
                  placeholder='Select Your Pronouns'
                  value={pronoun}
                  onChange={e => dispatch(setPronoun(e.target.value))}
                  renderValue={(pronoun) => {
                      if (!pronoun) {
                          return <em style={{color: "#a3a3a3"}}>Select your pronoun</em>;
                      }

                      const pronounObject = pronounList.find(pro => pro.ID === pronoun)


                      return pronounObject?.Pronoun


                  }}
              >
                  {
                      pronounList?.map((pronoun) => (
                          <MenuItem key={pronoun.ID} value={pronoun.ID}> {pronoun.Pronoun} </MenuItem>

                      ))
                  }


              </Select>
              {error && error.length > 0 &&
                  <Typography color='red'>
                      {error}
                  </Typography>
              }
          </Box>

          <Button variant='contained' sx={{ mt: '5rem', width: { xs: '90%',sm: '60%',  md: '50%', lg: '40%' }, borderRadius: '100px', backgroundColor: '#006BFA' }} onClick={handleNext}>
              {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}Next</Button>


      </FlexCont>
  );
}

