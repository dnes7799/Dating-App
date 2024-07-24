import React, { useEffect, useState, } from 'react'
import axios from 'axios';
import { Box, Typography, styled, TextField, Button, Select, MenuItem } from '@mui/material'

import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setInterestHeight, setInterestRace, setInterestWeight } from '../../../reducers/updateProfileSlice';


const heightList = [
    "3'9\" - 4'2\"",
    "4'3\" - 4'8\"",
    "4'9\" - 5'2\"",
    "5'3\" - 5'8\"",
    "5'9\" - 6'2\"",
    "6'3\" - 6'8\"",
    "6'9\" - 7'2\"",
    "7'3\" - 7'5\""
]

const weightList = [
    "30 - 39",
    "40 - 49",
    "50 - 59",
    "60 - 69",
    "70 - 79",
    "80 - 89",
    "90 - 99",
    "100 - 109",
    "110 - 119",
    "120 - 129",
    "130 - 139",
    "140 - 149",
    "150 - 159",
    "160 - 169",
    "170 - 179",
    "180 - 189",
    "190 - 199",
    "200 - 209",
    "210 - 219",
    "220 - 229",
    "230 - 239",
    "240 - 249",
    "250 - 259",
    "260 - 269",
    "270 - 279",
    "280 - 289",
    "290 - 299",
    "300 - 309",
    "310 - 319",
    "320 - 329",
    "330 - 339",
    "340 - 349",
    "350 - 359",
    "360 - 369",
    "370 - 379",
    "380 - 389",
    "390 - 399",
    "400 - 409",
    "410 - 419",
    "420 - 429",
    "430 - 439",
    "440 - 449",
    "450 - 459",
    "460 - 469",
    "470 - 479",
    "480 - 489",
    "490 - 499",
]



const FlexCont = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))



export default function OtherPersonInterest({ onNext, dispatch, baseUrl, access_token }) {
    const interestHeight = useSelector(state => state.profile.interestHeight)
    const [heightUnit, setHeightUnit] = useState('cm')
    const interestWeight = useSelector(state => state.profile.interestWeight)
    const [weightUnit, setWeightUnit] = useState('kg')
    const [loading, setLoading] = useState(false)
    const interestRace = useSelector(state => state.profile.interestRace)

    const [raceData, setRaceData] = useState([])

    const [error, setError] = useState('')



    useEffect(() => {


        const fetchRace = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/user/races`)


                if (response?.data?.isSuccess) {
                    setRaceData(response.data.responseData.races)
                }
            }
            catch (error) {
                console.error('catch block error', error)
            }

        }

        fetchRace()

    }, [])

    const handleNext = async () => {
        if (!interestHeight || !interestWeight || !interestRace) {
            setError("All fields are required")
            return
        }
        try {
            setLoading(true)
            const response = await axios.patch(`${baseUrl}/api/v1/user/me/secondary_interests`,
                {
                    height: interestHeight,
                    weight: interestWeight + weightUnit,
                    race_id: interestRace
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
            <Typography sx={{ fontSize: { xs: '24px', sm: '30px' }, fontFamily: 'fontRegular' }}>
                Select your interests in other person
            </Typography>
            <Typography textAlign='center'>
                You will be recommended profiles based on these  preferences
            </Typography>
            <Box component='form' sx={{ width: { xs: '90%', sm: '60%', md: '50%', lg: '40%' }, mt: 4 }}>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, my: 1 }}>
                    {/* <TextField
                      fullWidth
                      placeholder='Enter your height'
                      value={interestHeight}
                      onChange={e => dispatch(setInterestHeight(e.target.value))}

                  />
                  <Select
                      size='small'
                      value={heightUnit}
                      onChange={e => setHeightUnit(e.target.value)}
                  >
                      <MenuItem value='in'>in</MenuItem>
                      <MenuItem value='cm'>cm</MenuItem>
                  </Select> */}

                    <Select
                        fullWidth
                        size='small'
                        displayEmpty
                        placeholder='Select your race'
                        value={interestHeight}
                        onChange={e => dispatch(setInterestHeight(e.target.value))}
                        sx={{ my: 1 }}
                        renderValue={(ht) => {
                            if (!ht) {
                                return <em style={{ color: "#a3a3a3" }}> Select Your Preferred Height</em>;
                            }

                            // const selectedRaceObject = raceData.find((race) => race.ID === selectedRaceId);

                            // return selectedRaceObject ? selectedRaceObject.Race : null;

                            return ht
                        }}

                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }}
                    >
                        {heightList && heightList.map((height, index) => (
                            <MenuItem key={index} value={height}>{height}</MenuItem>
                        ))}
                    </Select>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems:'center', gap: 1, my: 1 }}>
                    {/* <TextField
                        fullWidth
                        placeholder='Enter your weight'
                        value={interestWeight}
                        onChange={e => dispatch(setInterestWeight(e.target.value))}

                    /> */}
                    <Select
                        fullWidth
                        size='small'
                        displayEmpty
                        placeholder='Select your race'
                        value={interestWeight}
                        onChange={e => dispatch(setInterestWeight(e.target.value))}
                        sx={{ my: 1 }}
                        renderValue={(wt) => {
                            if (!wt) {
                                return <em style={{ color: "#a3a3a3" }}> Select Your Preferred Weight</em>;
                            }

                            // const selectedRaceObject = raceData.find((race) => race.ID === selectedRaceId);

                            // return selectedRaceObject ? selectedRaceObject.Race : null;

                            return wt
                        }}
                    >
                        {weightList && weightList.map((weight, index) => (
                            <MenuItem key={index} value={weight}>{weight}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        size='small'
                        value={weightUnit}
                        onChange={e => setWeightUnit(e.target.value)}
                    >
                        <MenuItem value='kg'>Kg</MenuItem>
                        <MenuItem value='lbs'>Lbs</MenuItem>
                    </Select>
                </Box>
                <Select
                    fullWidth
                    size='small'
                    placeholder='Select your race'
                    value={interestRace}
                    onChange={e => dispatch(setInterestRace(e.target.value))}
                    sx={{ my: 1 }}
                    displayEmpty
                    renderValue={(selectedRaceId) => {
                        if (!selectedRaceId) {
                            return <em style={{ color: "#a3a3a3" }}>Select Your Preferred Race</em>;
                        }

                        const selectedRaceObject = raceData.find((race) => race.ID === selectedRaceId);

                        return selectedRaceObject ? selectedRaceObject.Race : null;
                    }}
                >
                    {raceData && raceData.map((race) => (
                        <MenuItem key={race.ID} value={race.ID}>{race.Race}</MenuItem>
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