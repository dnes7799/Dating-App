import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const updateProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        showInterests: false,
        userName: '',
        pronoun: '',
        birthday: '',
        height: '',
        weight: '',
        race: '',
        selectedInterest: [],
        ageGroup: '',
        interestHeight: '',
        interestWeight: '',
        interestRace: '',
        selectedOrientation: []


    },
    reducers: {
        setShowInterestSuccess: (state) => {
            state.showInterests = !state.showInterests
        },
        setUserName: (state, action) => {
            state.userName = action.payload
        },

        setPronoun: (state, action) => {
            state.pronoun = action.payload
        },
        setBirthday: (state, action) => {
            state.birthday = action.payload
        },
        setHeight: (state, action) => {
            state.height = action.payload
        },

        setWeight: (state, action) => {
            state.weight = action.payload
        },
        setRace: (state, action) => {
            state.race = action.payload
        },
        setSelectedInterest: (state, action) => {
            state.selectedInterest = action.payload
        },
        setAgeGroup: (state, action) => {
            state.ageGroup = action.payload
        },
        setInterestHeight: (state, action) => {
            state.interestHeight = action.payload
        },

        setInterestWeight: (state, action) => {
            state.interestWeight = action.payload
        },
        setInterestRace: (state, action) => {
            state.interestRace = action.payload
        },
        setSelectedOrientation: (state, action) => {
            state.selectedOrientation = action.payload
        }

    }
})

export const {
    setShowInterestSuccess,
    setUserName,
    setPronoun,
    setBirthday,
    setSelectedInterest,
    setWeight,
    setHeight,
    setRace,
    setInterestHeight,
    setInterestRace,
    setInterestWeight,
    setAgeGroup,
    setSelectedOrientation
} = updateProfileSlice.actions


export default updateProfileSlice.reducer