import { Box, Typography, useTheme, ThemeProvider, styled, Button, Select, MenuItem, createTheme } from '@mui/material'
import React, { useState } from 'react'
import {
    setViewCount,
    setAgeGroup,
    setRace,
    setHeight,
    setWeight,
    setRelationship,
    setCountry,
    setCity,
    setState,
    setProvince,
    setFetishes
} from '../../../../reducers/profileFilterSlice'

import { useDispatch, useSelector } from 'react-redux'
import { useGetRaceListQuery, useGetAgeGroupQuery } from '../../../../rtkmodules/profile/profileServices'
import { heightRange, heightList } from '../../../../constants/Height/Height'
import { weightRange } from '../../../../constants/Weight/Weight'
import { countryList, stateList } from '../../../../constants/Location/Location'

const InnerBox = styled(Box)(({ }) => ({
    height: '24px',
    borderRadius: '2px',
    backgroundColor: "#D9D9D9",

}))

const BoxButton = styled(Button)(({ theme }) => ({
    padding: '2px 4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '4px',
    width: '67px',
    height: '40px',
    backgroundColor: "#fff",
    "&:hover": {
        border: `1px solid ${theme.palette.primary.light}`,
        '& .inner-box': {
            backgroundColor: theme.palette.primary.light
        }
    }
}))

const FilterSelect = styled(Select)(({ theme }) => ({
    margin: '6px 0',
    '&.MuiOutlinedInput-root': {
        backgroundColor: theme.palette.background.default
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        borderRadius: '2px',
        borderBottom: `1px solid ${theme.palette.secondary.border}`
    },
}))


export default function ProfileFilter({setOpenFilter}) {


    const viewCount = useSelector(state => state.profileFilter.viewCount)
    const ageGroup = useSelector(state => state.profileFilter.ageGroup)
    const race = useSelector(state => state.profileFilter.race)
    const height = useSelector(state => state.profileFilter.height)
    const weight = useSelector(state => state.profileFilter.weight)
    const relationship = useSelector(state => state.profileFilter.relationship)
    const country = useSelector(state => state.profileFilter.country)
    const state = useSelector(state => state.profileFilter.state)
    const province = useSelector(state => state.profileFilter.province)
    const city = useSelector(state => state.profileFilter.city)
    const fetishes = useSelector(state => state.profileFilter.fetishes)

    const [tempViewCount, setTempViewCount] = useState(viewCount);
    const [tempAgeGroup, setTempAgeGroup] = useState(ageGroup);
    const [tempRace, setTempRace] = useState(race); // added state for race
    const [tempHeight, setTempHeight] = useState(height); // added state for height
    const [tempWeight, setTempWeight] = useState(weight); // added state for weight
    const [tempRelationship, setTempRelationship] = useState(relationship); // added state for relationship
    const [tempCountry, setTempCountry] = useState(country); // added state for country
    const [tempState, setTempState] = useState(state); // added state for state
    const [tempProvince, setTempProvince] = useState(province); // added state for province
    const [tempCity, setTempCity] = useState(city); // added state for city
    const [tempFetishes, setTempFetishes] = useState(fetishes); // added state for fetishes



    const dispatch = useDispatch()
    const theme = useTheme()


    const { data: raceData, isLoading: raceDataLoading } = useGetRaceListQuery()
    const { data: ageGroupData, isLoading: ageGroupLoading } = useGetAgeGroupQuery()


    const handleReset = () => {
        dispatch(setViewCount(viewCount))
        dispatch(setAgeGroup(''))
        dispatch(setRace(''))
        dispatch(setHeight(''))
        dispatch(setWeight(''))
        dispatch(setRelationship(''))
        dispatch(setCountry(''))
        dispatch(setState(''))
        dispatch(setProvince(''))
        dispatch(setCity(''))
        dispatch(setFetishes(''))

        setOpenFilter(false)

    }

    const handleFilterSubmit = (e) => {
        e.preventDefault()

        //dispatch(setViewCount(tempViewCount))
        dispatch(setAgeGroup(tempAgeGroup))
        dispatch(setRace(tempRace))
        dispatch(setHeight(tempHeight))
        dispatch(setWeight(tempWeight))
        dispatch(setRelationship(tempRelationship))
        dispatch(setCountry(tempCountry))
        dispatch(setState(tempState))
        dispatch(setProvince(tempProvince))
        dispatch(setCity(tempCity))
        dispatch(setFetishes(tempFetishes))

        setOpenFilter(false)

    }


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ p: 2, height: '100vh', backgroundColor: theme.palette.secondary.profile }}>
                <Typography sx={{ fontSize: { xs: "1.2rem", sm: '1.4rem', md: "1.6rem", lg: '1.8rem' }, fontFamily: 'fontRegular' }}>
                    Filter
                </Typography>


                <Typography sx={{ mt: 2.5 }}>
                    Create View
                </Typography>

                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>

                    <BoxButton onClick={() => dispatch(setViewCount(12))} sx={{
                        borderColor: viewCount === 12 ? theme.palette.primary.light : "#D9D9D9"
                    }} >
                        <InnerBox className="inner-box" sx={{ flexBasis: '85%', backgroundColor: viewCount === 12 ? theme.palette.primary.light : "#D9D9D9" }} />
                    </BoxButton>

                    <BoxButton sx={{ gap: 0.6, borderColor: viewCount === 6 ? theme.palette.primary.light : "#D9D9D9" }} onClick={() => dispatch(setViewCount(6))}>
                        {
                            (() => {
                                return ['1', '2'].map((item, index) => (
                                    <InnerBox
                                        key={index}
                                        className="inner-box"
                                        sx={{
                                            flexBasis: "40%",
                                            backgroundColor: viewCount === 6 ? theme.palette.primary.light : "#D9D9D9"
                                        }}
                                    />
                                ));
                            })()
                        }
                    </BoxButton>

                    <BoxButton sx={{ gap: 0.4, borderColor: viewCount === 4 ? theme.palette.primary.light : "#D9D9D9" }} onClick={() => dispatch(setViewCount(4))}>

                        {
                            (() => {
                                return ['1', '2', '3'].map((item, index) => (
                                    <InnerBox
                                        key={index}
                                        className="inner-box"
                                        sx={{
                                            flexBasis: "26.67%",
                                            backgroundColor: viewCount === 4 ? theme.palette.primary.light : "#D9D9D9"
                                        }}
                                    />
                                ));
                            })()
                        }

                    </BoxButton>

                    <BoxButton onClick={() => dispatch(setViewCount(3))} sx={{
                        gap: 0.3,
                        borderColor: viewCount === 3 ? theme.palette.primary.light : "#D9D9D9",

                    }}
                    >

                        {
                            (() => {
                                return ['1', '2', '3', '4'].map((item, index) => (
                                    <InnerBox
                                        key={index}
                                        className="inner-box"
                                        sx={{
                                            flexBasis: "20%",
                                            backgroundColor: viewCount === 3 ? theme.palette.primary.light : "#D9D9D9"
                                        }}
                                    />
                                ));
                            })()
                        }


                    </BoxButton>

                    <BoxButton sx={{ gap: 0.3, borderColor: viewCount === 12 / 5 ? theme.palette.primary.light : "#D9D9D9" }} onClick={() => dispatch(setViewCount(12/5))}>
                        {
                            (() => {
                                return ['1', '2', '3', '4', '5'].map((item, index) => (
                                    <InnerBox
                                        key={index}
                                        className="inner-box"
                                        sx={{
                                            flexBasis: "16%",
                                            backgroundColor: viewCount === 12 / 5 ? theme.palette.primary.light : "#D9D9D9"
                                        }}
                                    />
                                ));
                            })()
                        }
                    </BoxButton>

                </Box>

                <Box component='form' onSubmit={handleFilterSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>

                    <Typography sx={{ mb: 0.5 }}>
                        Preferences
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>

                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>

                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempAgeGroup}
                                onChange={e => setTempAgeGroup(e.target.value)}

                                renderValue={(ageGroup) => {
                                    if (!ageGroup) {
                                        return <em style={{ color: "#a3a3a3" }}>Select Age Groups</em>;
                                    }

                                    const ageGroupObject = ageGroupData?.responseData?.ageGroups?.find(age => age.ID === ageGroup)

                                    return ageGroupObject?.AgeGroup
                                }}
                            >
                                {ageGroupData && ageGroupData?.responseData?.ageGroups?.map((age) => (
                                    <MenuItem key={age.ID} value={age.ID}>{age.AgeGroup}</MenuItem>
                                ))}
                            </FilterSelect>

                        </Box>
                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>
                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempRace}
                                onChange={e => setTempRace(e.target.value)}
                                sx={{ overflow: 'hidden' }}
                                renderValue={(selectedRaceId) => {
                                    if (!selectedRaceId) {
                                        return <em style={{ color: "#a3a3a3" }}> Select Your Race</em>;
                                    }

                                    const selectedRaceObject = raceData?.responseData?.races?.find((race) => race.ID === selectedRaceId);

                                    return selectedRaceObject ? selectedRaceObject.Race : null;
                                }}
                            >
                                {raceData && raceData?.responseData?.races?.map((race) => (
                                    <MenuItem key={race.ID} value={race.ID}>
                                        {race.Race}
                                    </MenuItem>
                                ))}
                            </FilterSelect>

                        </Box>
                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>
                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempHeight}
                                onChange={e => setTempHeight(e.target.value)}
                                renderValue={(ht) => {
                                    if (!ht) {
                                        return <em style={{ color: "#a3a3a3" }}> Select Your Preferred Height</em>;
                                    }

                                    return ht
                                }}


                            >
                                {heightList && heightList.map((height, index) => (
                                    <MenuItem key={index} value={height}>{height}</MenuItem>
                                ))}
                            </FilterSelect>

                        </Box>

                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>
                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempWeight}
                                onChange={e => setTempWeight(e.target.value)}

                                renderValue={(wt) => {
                                    if (!wt) {
                                        return <em style={{ color: "#a3a3a3" }}> Select Your Preferred Weight</em>;
                                    }

                                    return wt
                                }}

                            >
                                {weightRange && weightRange.map((weight, index) => (
                                    <MenuItem key={index} value={weight}>{weight}</MenuItem>
                                ))}
                            </FilterSelect>

                        </Box>
                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>
                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempRelationship}
                                onChange={e => setTempRelationship(e.target.value)}

                                renderValue={(relationship) => {
                                    if (!relationship) {
                                        return <em style={{ color: "#a3a3a3" }}> Select Relationship Preference</em>;
                                    }

                                    return relationship
                                }}

                            >
                                {/* {weightRange && weightRange.map((weight, index) => (
                                    <MenuItem key={index} value={weight}>{weight}</MenuItem>
                                ))} */}
                            </FilterSelect>

                        </Box>



                    </Box>

                    <Typography sx={{ mt: 2 }}>
                        Location
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>

                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempCountry}
                                onChange={e => setTempCountry(e.target.value)}

                                renderValue={(c) => {
                                    if (!c) {
                                        return <em style={{ color: "#a3a3a3" }}>Select Country</em>;
                                    }

                                    return c
                                }}
                            >
                                {countryList && countryList.map((country, index) => (
                                    <MenuItem key={index} value={country}>{country}</MenuItem>
                                ))}
                            </FilterSelect>

                        </Box>
                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>

                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempState}
                                onChange={e => setTempState(e.target.value)}

                                renderValue={(state) => {
                                    if (!state) {
                                        return <em style={{ color: "#a3a3a3" }}>Select State</em>;
                                    }

                                    return state
                                }}
                            >
                                {stateList && stateList.map((state, index) => (
                                    <MenuItem key={index} value={state}>{state}</MenuItem>
                                ))}
                            </FilterSelect>

                        </Box>

                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>

                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempProvince}
                                onChange={e => setTempProvince(e.target.value)}

                                renderValue={(province) => {
                                    if (!province) {
                                        return <em style={{ color: "#a3a3a3" }}>Select Province</em>;
                                    }

                                    return province
                                }}
                            >
                                {/* {stateList && stateList.map((state, index) => (
                                    <MenuItem key={index} value={state}>{state}</MenuItem>
                                ))} */}
                            </FilterSelect>

                        </Box>


                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>

                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempCity}
                                onChange={e => setTempCity(e.target.value)}

                                renderValue={(city) => {
                                    if (!city) {
                                        return <em style={{ color: "#a3a3a3" }}>Select City</em>;
                                    }

                                    return city
                                }}
                            >
                                {/* {stateList && stateList.map((state, index) => (
                                    <MenuItem key={index} value={state}>{state}</MenuItem>
                                ))} */}
                            </FilterSelect>

                        </Box>

                    </Box>

                    <Typography sx={{ mt: 2 }}>
                        Premium
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>

                        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 4px)' } }}>
                            <FilterSelect
                                fullWidth
                                size='small'
                                displayEmpty
                                value={tempFetishes}
                                onChange={e => setTempFetishes(e.target.value)}

                                renderValue={(fetish) => {
                                    if (!fetish) {
                                        return <em style={{ color: "#a3a3a3" }}> Select Fetishes</em>;
                                    }

                                    return fetish
                                }}

                            >
                                {/* {weightRange && weightRange.map((weight, index) => (
                                    <MenuItem key={index} value={weight}>{weight}</MenuItem>
                                ))} */}
                            </FilterSelect>

                        </Box>
                    </Box>


                    <Box sx={{ mt: 2, mb: 2, width: '100%', display: 'flex', flexDirection: 'row', gap: 1.5, alignSelf: 'flex-end' }}>
                        <Button variant='contained' type='submit'
                            sx={{
                                flexBasis: '50%',
                                borderRadius: '100px',
                                backgroundColor: theme.palette.primary.main
                            }}
                        >
                            <Typography sx={{ textTransform: 'none' }}>
                                Continue
                            </Typography>
                        </Button>

                        <Button variant='outlined' onClick={handleReset}
                            sx={{
                                flexBasis: '50%',
                                borderRadius: '100px',
                                borderColor: 'red',
                                color: 'red',
                                "&:hover": {
                                    borderColor: '#f03737',
                                    backgroundColor: ' #ffd9d9'
                                }
                            }}>
                            <Typography sx={{ textTransform: 'none', color: 'red' }}>
                                Reset
                            </Typography>
                        </Button>

                    </Box>

                </Box>


            </Box>
        </ThemeProvider>
    )
}
