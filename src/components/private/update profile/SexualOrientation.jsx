import React, { useEffect, useState, } from 'react'
import axios from 'axios';
import { Box, Typography, styled, TextField, Button, Chip, InputAdornment } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedOrientation } from '../../../reducers/updateProfileSlice';

//icons
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import SearchIcon from '@mui/icons-material/Search';


const FlexCont = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))

export default function SexualOrientation({ onNext, baseUrl, dispatch, access_token }) {

    const [orientationData, setOrientationData] = useState([])
    const selectedOrientation = useSelector(state => state.profile.selectedOrientation)
    const [searchField, setSearchField] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState('')

    console.log("sex orien", access_token)

    console.log(selectedOrientation)

    useEffect(() => {

        const fetchOrientation = async () => {
            const response = await axios.get(`${baseUrl}/api/v1/user/sexual_orientations`)

            if (response.data.isSuccess) {
                setOrientationData(response.data.responseData.sexualOrientations)
            }
        }

        fetchOrientation()

    }, [])

    const handleChipClick = (id) => {
        const isSelected = selectedOrientation.includes(id);
        if (isSelected) {
            dispatch(setSelectedOrientation(selectedOrientation.filter((item) => item !== id)));
        } else {
            dispatch(setSelectedOrientation([id]));
        }
    }

    const handleNext = async () => {
        if (selectedOrientation.length === 0) {
            setError("You must select your sexual orientation preference")
            return
        }
        try {
            setLoading(true)
            const response = await axios.patch(`${baseUrl}/api/v1/user/me/secondary_interests`,
                {
                    sexual_orientation_preference_ids: selectedOrientation
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
            )

            if (response.data.isSuccess) {
                navigate('/home')

            }
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }


    return (
        <FlexCont sx={{ flexDirection: 'column', width: '100%' }}>
            <Typography sx={{ fontSize: { xs: '24px', sm: '30px' } }}>
                Select sexual orientation preference
            </Typography>

            <Box component='form' sx={{ width: { xs: '90%',sm: '60%',  md: '50%', lg: '40%' }, mt: 4, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>


                <TextField
                    placeholder='Search...'
                    size='small'
                    type='text'
                    value={searchField}
                    onChange={e => setSearchField(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}

                />


                {searchField.length === 0 ?
                    orientationData.map((item) => (
                        <Chip variant='outlined' key={item.ID} label={item.SexualOrientation} onClick={() => handleChipClick(item.ID)}
                            sx={{
                                borderColor: '#006BFA',
                                backgroundColor: selectedOrientation.includes(item.ID) ? '#006BFA' : '#fff',
                                color: selectedOrientation.includes(item.ID) ? '#fff' : '#006BFA',

                                '&&:hover':{
                                    backgroundColor: selectedOrientation.includes(item.ID) ? '#2b86ff' : 'inherit'
                                }
                          
                            }}

                            icon={selectedOrientation.includes(item.ID) ? <DoneIcon color='#fff' /> : <AddIcon color="#006BFA" />}


                        />
                    ))

                    :
                    orientationData.filter(item => item.SexualOrientation.toLowerCase().includes(searchField.toLowerCase())).length > 0 ? (
                        orientationData
                            .filter(item => item.SexualOrientation.toLowerCase().includes(searchField.toLowerCase()))
                            .map(filteredItem => (
                                <Chip
                                    variant='outlined'
                                    key={filteredItem.ID}
                                    label={filteredItem.SexualOrientation}
                                    onClick={() => handleChipClick(filteredItem.ID)}
                                    sx={{
                                        borderColor: '#006BFA',
                                        backgroundColor: selectedOrientation.includes(filteredItem.ID) ? '#006BFA' : '#fff',
                                        color: selectedOrientation.includes(filteredItem.ID) ? '#fff' : '#006BFA',
                                        '&:hover': {
                                            color: 'none',
                                            backgrondColor: 'none'
                                        }
                                    }}
                                    icon={selectedOrientation.includes(filteredItem.ID) ? <DoneIcon color='#fff' /> : <AddIcon color="#006BFA" />}
                                />
                            ))
                    ) : (
                        <Typography sx={{ fontSize: { xs: '1.5rem', sm: '1.7rem', lg: '2rem' } }}>
                            Searched sexual orientation is not found.
                        </Typography>
                    )


                }


            </Box>

            {error && error.length > 0 &&
                <Typography color='red'>
                    {error}
                </Typography>
            }

            <Button variant='contained' sx={{ mt: '5rem', width: { xs: '90%', sm: '60%', md: '50%', lg: '40%' }, borderRadius: '100px', backgroundColor: '#006BFA' }} onClick={handleNext}>
                {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}
                Next
            </Button>


        </FlexCont>
    )
}