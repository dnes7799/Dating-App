import React, { useEffect, useCallback, useState, useContext } from 'react'
import dayjs from 'dayjs';
import axios from 'axios';
import { Box, Typography,Button, styled } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, } from 'react-redux';
import { setBirthday } from '../../../reducers/updateProfileSlice';
import swal from 'sweetalert';

const FlexCont = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

export default function BirthdayStep({ onNext, baseUrl, dispatch, access_token }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const birthday = useSelector(state => state.profile.birthday)

    console.log(birthday)

    const below18 = dayjs().subtract(18, 'year')
    const formattedBelow18 = below18?.format('YYYY-MM-DD')

    const handleNext = async () => {
        if (!birthday) {
            setError("Invalid Date of Birth")
            return
        }
        if(birthday > formattedBelow18){
            swal({
                icon:'error',
                text: "You must be above 18 years old to continue."
            })

            return
        }

        try {
            setLoading(true)
            const response = await axios.patch(`${baseUrl}/api/v1/user/me`, {
                birthday
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
                When's your birthday?
            </Typography>
            <Box component='form' sx={{ width: { xs: '90%',sm: '60%',  md: '50%', lg: '40%' }, mt: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            fullWidth
                            label="Select your birthday"
                            value={birthday ? dayjs(birthday) : dayjs(new Date()) }
                            onChange={(newValue) => dispatch(setBirthday(dayjs(newValue)?.format('YYYY-MM-DD')))}
                            maxDate={dayjs()}


                        />
                    </DemoContainer>
                </LocalizationProvider>
                {/* <input
                    type='date'
                    style={{ padding: '0.8rem', width: "100%", borderRadius: '100px', border: 'none', backgroundColor: '#fff', borderBottom: '2px solid #CCC' }}
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)} /> */}


            </Box>
            {error && error.length > 0 &&
                <Typography color='red'>
                    {error}
                </Typography>
            }

            <Button variant='contained' sx={{ mt: '5rem', width: { xs: '90%',sm: '60%',  md: '50%', lg: '40%' }, borderRadius: '100px', backgroundColor: '#006BFA' }} onClick={handleNext}>
                {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}Next</Button>


        </FlexCont>
    );
}