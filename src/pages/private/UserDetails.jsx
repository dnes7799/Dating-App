import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid, useTheme, ThemeProvider, Typography, Divider } from '@mui/material'



import Profileman from '../../assets/ProfileMan.jpg'
import HomeImage2 from '../../assets/HomeImage2.jpg'
import HomeImage3 from '../../assets/HomeImage3.jpg'
import HomeImage4 from '../../assets/HomeImage4.jpg'
import HomeImage5 from '../../assets/HomeImage5.jpg'
import HomeImage6 from '../../assets/HomeImage6.jpg'


import HomeUserProfile from '../../components/private/home/User/HomeUserProfile'
import Photos from '../../components/private/profile/Photos'
import SuggestedProfile from '../../components/private/SuggestedProfile'

import { useGetUserDetailsQuery } from '../../rtkmodules/home/RecommededUsers'

const profileList = [
    {
        id: 1,
        name: "Aadarsha Lamichhane",
        pronoun: "he/him",
        age: 25,
        height: "6'1\"",
        weight: 180,
        race: "Asian",
        location: "Texas",
        distance: "20 miles away",
        img: Profileman
    },
    {
        id: 2,
        name: "John See-Nah",
        pronoun: "they/them",
        age: 30,
        height: "5'8\"",
        weight: 160,
        race: "African American",
        location: "San Francisco",
        distance: "140 miles away",
        img: HomeImage2
    },
    {
        id: 3,
        name: "Samantha Johnson",
        pronoun: "she/her",
        age: 28,
        height: "5'5\"",
        weight: 140,
        race: "African American",
        location: "New York",
        distance: "50 miles away",
        img: HomeImage4
    },
    {
        id: 4,
        name: "Brandon Miller",
        pronoun: "he/him",
        age: 26,
        height: "6'0\"",
        weight: 175,
        race: "Hispanic Latino",
        location: "Los Angeles",
        distance: "30 miles away",
        img: HomeImage3
    },
    {
        id: 5,
        name: "Jennifer Smith",
        pronoun: "she/her",
        age: 32,
        height: "5'7\"",
        weight: 150,
        race: "Native Hawaiian",
        location: "Chicago",
        distance: "80 miles away",
        img: HomeImage5
    },
    {
        id: 6,
        name: "Alex Rodriguez",
        pronoun: "he/him",
        age: 24,
        height: "5'10\"",
        weight: 160,
        race: "Non-Hispanic Latino",
        location: "Miami",
        distance: "10 miles away",
        img: HomeImage6
    },
    {
        id: 7,
        name: "Emily White",
        pronoun: "she/her",
        age: 27,
        height: "5'6\"",
        weight: 130,
        race: "White",
        location: "Denver",
        distance: "120 miles away",
        img: HomeImage2
    },
    {
        id: 8,
        name: "Tyler Davis",
        pronoun: "he/him",
        age: 29,
        height: "6'2\"",
        weight: 200,
        race: "Asian",
        location: "Seattle",
        distance: "90 miles away",
        img: Profileman
    },
    {
        id: 9,
        name: "Natalie Brown",
        pronoun: "she/her",
        age: 31,
        height: "5'9\"",
        weight: 145,
        race: "African American",
        location: "Atlanta",
        distance: "60 miles away",
        img: HomeImage5
    },
    {
        id: 10,
        name: "Christopher Taylor",
        pronoun: "he/him",
        age: 28,
        height: "5'11\"",
        weight: 170,
        race: "White",
        location: "Boston",
        distance: "25 miles away",
        img: HomeImage3
    },
    {
        id: 11,
        name: "Amanda Turner",
        pronoun: "she/her",
        age: 26,
        height: "5'4\"",
        weight: 120,
        race: "American Indian",
        location: "Dallas",
        distance: "15 miles away",
        img: HomeImage6
    },
    {
        id: 12,
        name: "Justin Martinez",
        pronoun: "he/him",
        age: 30,
        height: "6'0\"",
        weight: 185,
        race: "African American",
        location: "Phoenix",
        distance: "70 miles away",
        img: HomeImage4
    }
];

export default function UserDetails() {
    const theme = useTheme()
    const [user, setUser] = useState({})
    const { id } = useParams()
    const userId = parseInt(id, 10)


    const { data: userData, isLoading: userDataLoading } = useGetUserDetailsQuery(userId)


    // const userObj = profileList.find((profile) => profile.id === userId);

    if (userDataLoading) {
        return 'Loading... '
    }

    const userObj = userData?.responseData


    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={4.5} md={3.5}>
                    <HomeUserProfile userObj={userObj} />
                </Grid>

                <Grid item xs={12} sm={7.5} md={5.5}>
                    <Photos userId = {userObj?.ID}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ p: 0.5, display: {xs:'none', sm:'inherit'}, height:'100%' }} >
                    <SuggestedProfile />
                </Grid>


            </Grid>
        </ThemeProvider>
    )
}
