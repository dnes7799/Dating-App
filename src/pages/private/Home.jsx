//react imports
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//Mui Components
import { Box, Typography, Grid, IconButton, useTheme, ThemeProvider, Drawer, useMediaQuery, Button, } from "@mui/material";

//icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import RedCross from '../../assets/RedCross.svg'
import Like from '../../assets/Like.svg'
import Favorite from '../../assets/Favorite.svg'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

//images 
import Profileman from '../../assets/ProfileMan.jpg'
import HomeImage2 from '../../assets/HomeImage2.jpg'
import HomeImage3 from '../../assets/HomeImage3.jpg'
import HomeImage4 from '../../assets/HomeImage4.jpg'
import HomeImage5 from '../../assets/HomeImage5.jpg'
import HomeImage6 from '../../assets/HomeImage6.jpg'
import ProfileFilter from "../../components/private/home/Filter/ProfileFilter";
import { useSelector } from "react-redux";

import { useGetAgeGroupQuery, useGetRaceListQuery } from "../../rtkmodules/profile/profileServices";
import { useGetRecommendedUsersQuery } from "../../rtkmodules/home/RecommededUsers";


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


const Home = () => {

    const theme = useTheme()
    const navigate = useNavigate()

    const isAbove900 = useMediaQuery('(min-width:900px)')
    const isBelow600 = useMediaQuery("(max-width: 600px)")

    const [openFilter, setOpenFilter] = useState(false);
    const [filteredProfile, setFilteredProfile] = useState([])
    const [filterRace, setFilterRace] = useState('')
    const [filterAge, setFilterAge] = useState('')
    const [filterHeight, setFilterHeight] = useState('')
    const [loading, setLoading] = useState(false)


    //global state of filter
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


    var fontSize = {
        xs: viewCount === 12 / 5 ? '0.5rem' : viewCount === 3 ? '0.6rem' : viewCount === 4 ? '0.8rem' : '1.1rem',
        sm: viewCount === 12 / 5 ? '0.7rem' : viewCount === 3 ? '0.8rem' : viewCount === 4 ? '1rem' : '1.2rem',
        md: viewCount === 12 / 5 ? '1rem' : viewCount === 3 ? '1.2rem' : viewCount === 4 ? '1.3rem' : '1.4rem',
        lg: viewCount === 12 / 5 ? '1.2rem' : viewCount === 3 ? '1.4rem' : viewCount === 4 ? '1.5rem' : '1.6rem'
    }

    const { data: recommendedUsers, isLoading: recommendedUsersLoading } = useGetRecommendedUsersQuery({
        refetchOnMountOrArgChange: true,
    })
    const { data: raceData, isLoading: raceDataLoading } = useGetRaceListQuery({
        refetchOnMountOrArgChange: true,
    })
    const { data: ageGroupData, isLoading: ageGroupLoading } = useGetAgeGroupQuery({
        refetchOnMountOrArgChange: true,
    })


    useEffect(() => {

        window.scrollTo(0, 0);

    }, [isBelow600])

    useEffect(() => {
        if (race) {
            const raceObj = raceData?.responseData?.races?.find((r) => r.ID === race)
            setFilterRace(raceObj?.Race)
        } else (
            setFilterRace('')
        )
    }, [race])

    useEffect(() => {

        if (ageGroup) {
            const ageGroupObj = ageGroupData?.responseData?.ageGroups?.find((age) => age.ID === ageGroup)

            setFilterAge(ageGroupObj?.AgeGroup)
        } else (
            setFilterAge('')
        )

    }, [ageGroup])

    const toggleDrawer = () => {
        setOpenFilter((prev) => !prev);
    };

    useEffect(() => {
        const minAge = filterAge?.split('-')[0]
        const maxAge = filterAge?.split('-')[1]

        setLoading(true)

        // const filterList = async () => {
        const filterUserList = profileList.filter((item) => {

            const raceCondition = filterRace ? item.race === filterRace : item.race
            const ageCondition = filterAge ? item.age > minAge && item.age < maxAge : item.age

            //const heightCondition = filterHeight ? item.height === filterHeight : item.height

            return raceCondition && ageCondition
        })

        setFilteredProfile(filterUserList)

        setLoading(false)
        // }

        // filterList()

    }, [race, ageGroup, filterRace, filterAge])

    const handleIgnore = (id) => {
        console.log('ignored', id)
    }

    const handleLike = (id) => {
        console.log('liked', id)

    }

    const handleFavorite = (id) => {
        console.log('favorited', id)

    }



    if (loading) {
        return <div> Loading... </div>
    }



    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, }}>
                    <Typography sx={{ px: 2, mb: { xs: 0, sm: 2 }, fontSize: { xs: "1.5rem", sm: '1.8rem', md: "2rem", lg: '2.5rem' }, fontFamily: 'fontRegular' }}>
                        Home
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'flex-end' }}>
                        <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontSize: fontSize, color: theme.palette.secondary.text }}>Filter</Typography>

                        <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={() => navigate('/notifications')} >
                            <NotificationsIcon />
                        </IconButton>

                        <IconButton onClick={() => toggleDrawer()} >
                            <FilterListIcon />
                        </IconButton>
                        <Drawer anchor="right" open={openFilter} onClose={() => toggleDrawer()}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    width: { xs: '80%', sm: '80%', md: '60%', lg: '50%' }
                                }
                            }}
                        >
                            <ProfileFilter setOpenFilter={setOpenFilter} />
                        </Drawer>
                    </Box>
                </Box>

                {/* <Box container  sx={{ p:2, height: '100%', display: 'flex', flexDirection: 'row', }} > */}
                <Box sx={{ px: 2, height: '100%', display: 'flex', gap: 2, }}

                >
                    <Grid container spacing={viewCount === 12 ? 0 : 1}
                        sx={{
                            width: viewCount === 12 && isAbove900 ? '40%' : viewCount === 6 && isAbove900 ? '60%' : '100%',
                            height: viewCount === 12 && isBelow600 ? '100vh' : 'auto',
                            mx: 'auto',
                            overflowY: viewCount === 12 && isBelow600 ? 'scroll' : 'hidden',
                            scrollSnapType: 'y mandatory',
                        }}
                    >

                        {
                            // !loading && filteredProfile?.length === 0 ? <Typography variant="h4"> There are no users with those filters. </Typography>
                            //     :

                            recommendedUsers?.responseData?.
                                map((item) => (

                                    <Grid item key={item.userId} xs={viewCount}
                                        sx={{
                                            backgroundColor: viewCount === 12 ? theme.palette.background.alt : 'inherit',
                                            padding: viewCount === 12 ? '2.5rem' : 'inherit',
                                            marginBottom: viewCount === 12 ? '1rem' : 'inherit',
                                            borderRadius: viewCount === 12 ? '10px' : 'inherit',
                                            height: viewCount === 12 && isBelow600 ? '85vh' : 'auto',
                                            mb: '1rem',
                                            scrollSnapAlign: 'center',
                                            '&:hover': {
                                                transform: isBelow600 ? 'none' : 'scale(1.04)',
                                                transition: '0.3s transform',
                                                cursor: 'pointer'
                                            },
                                        }}
                                    >
                                        <Box onClick={() => navigate(`/users/${item.userId}`)}>
                                            <img src={item.profile_pic_url} style={{ width: '100%', aspectRatio: viewCount === 12 && isBelow600 ? 1 / 1 : 1 / 1, borderRadius: '4px' }} />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', mt: 1, mb: 1, rowGap: '0.2rem' }}>
                                            <Box >
                                                <Typography sx={{ fontWeight: 'bold', fontSize: fontSize, color: viewCount === 12 ? theme.palette.primary[600] : 'inherit' }}>
                                                    {item.username}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', columnGap: 0.5, alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <LocationOnOutlinedIcon sx={{ color: viewCount === 12 ? theme.palette.primary[600] : 'inherit', fontSize: fontSize }} />
                                                <Typography sx={{ color: viewCount === 12 ? theme.palette.primary[600] : 'inherit', fontSize: fontSize }}>
                                                    {item.location}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <ShortcutOutlinedIcon sx={{ color: viewCount === 12 ? theme.palette.primary[600] : 'inherit', fontSize: fontSize }} />
                                                <Typography sx={{ color: viewCount === 12 ? theme.palette.primary[600] : 'inherit', fontSize: fontSize }}>
                                                    {/* {item.distance} */} Distance
                                                </Typography>
                                            </Box>

                                            {viewCount === 12 ?
                                                <Box sx={{
                                                    mt: 2,
                                                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                                    gap: 2,

                                                }}>

                                                    <Button onClick={() => handleIgnore(item.userId)}
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            borderRadius: '50%',
                                                            border: '1px solid #FBD0D2',
                                                            p: 1,
                                                            minWidth: 0,
                                                            color: 'red',
                                                        }}>

                                                        <img src={RedCross} />

                                                    </Button>
                                                    <Button onClick={() => handleFavorite(item.userId)}
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            borderRadius: '50%',
                                                            border: '1px solid #CCE2FF',
                                                            p: 1,
                                                            minWidth: 0,
                                                            color: 'blue'
                                                        }}>

                                                        <img src={Favorite} />

                                                    </Button>
                                                    <Button onClick={() => handleLike(item.userId)}
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            borderRadius: '50%',
                                                            border: '1px solid #D3FBD0',
                                                            p: 1,
                                                            minWidth: 0,
                                                            color: 'green'
                                                        }}>

                                                        <img src={Like} />

                                                    </Button>
                                                </Box>

                                                :
                                                null
                                            }
                                        </Box>
                                    </Grid>

                                ))
                        }

                    </Grid>

                    <Box sx={{
                        display: viewCount === 12 && !isBelow600 ? "none" : "none",
                        flexDirection: 'column',
                        rowGap: 25,
                        alignItems: 'center',
                    }}>

                        <Box sx={{ width: '100%', borderRadius: '50%', border: '1px solid grey' }}>
                            <IconButton>
                                <ArrowUpwardIcon sx={{ fontSize: "4rem" }} />
                            </IconButton>
                        </Box>

                        <Box sx={{ width: '100%', borderRadius: '50%', border: '1px solid grey' }}>
                            <IconButton>
                                <ArrowDownwardIcon sx={{ fontSize: "4rem" }} />
                            </IconButton>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Home;