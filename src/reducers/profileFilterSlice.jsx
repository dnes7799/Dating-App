import { createSlice } from "@reduxjs/toolkit";

const profileFilterSlice = createSlice({
    name: 'profileFilter',
    initialState: {
        viewCount: 12/5,
        ageGroup: '',
        race: '',
        height: '',
        weight: '',
        relationship: '',
        country: '',
        state: '',
        province: '',
        city: '',
        fetishes: ''

    },
    reducers: {
        setViewCount: (state,action) => {
            state.viewCount = action.payload
        }, 
        setAgeGroup: (state,action) => {
            state.ageGroup = action.payload
        }, 
        setRace: (state,action) => {
            state.race = action.payload
        }, 
        setHeight: (state,action) => {
            state.height = action.payload
        }, 
        setWeight: (state,action) => {
            state.weight = action.payload
        }, 
        setRelationship: (state,action) => {
            state.relationship = action.payload
        }, 
        setCountry: (state,action) => {
            state.country = action.payload
        }, 
        setState: (state,action) => {
            state.state = action.payload
        }, 
        setProvince: (state,action) => {
            state.province = action.payload
        }, 
        setCity: (state,action) => {
            state.city = action.payload
        }, 
        setFetishes: (state,action) => {
            state.fetishes = action.payload
        }, 
    }
})

export const {
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
} = profileFilterSlice.actions

export default profileFilterSlice.reducer