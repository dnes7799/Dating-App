import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

//mui components
import {
    Box,
    Button,
    Typography,
    useTheme,
    ThemeProvider,
    Divider,
    Skeleton,
    Stack,
    Modal,
    Tabs, Tab
} from '@mui/material'



//rtk modules serivces
import { useGetProfileQuery, useGetPronounListQuery, useGetRaceListQuery } from '../../../rtkmodules/profile/profileServices';
import { useGetPhotosQuery } from '../../../rtkmodules/photos/photosServices';
import { useGetFavoritedByQuery, useGetLikedByQuery, useGetViewedByQuery } from '../../../rtkmodules/user actions/userActionServices';

//icons
import VisibilityIcon from '@mui/icons-material/Visibility';

//components
import ViewedByUserModal from './Modal/ViewedByUserModal';
import LikedByUserModal from './By User/LikedByUser';
import FavoritedByUserModal from './By User/FavoritedByUser';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function UserProfile() {
    const theme = useTheme()

    const [username, setUsername] = useState('')
    const [pronoun, setPronoun] = useState("")
    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [race, setRace] = useState("")

    const [images, setImages] = useState([])
    const [dp, setDp] = useState("")

    const [viewsCount, setViewsCount] = useState(0)
    const [likesCount, setLikesCount] = useState(0)
    const [favoritesCount, setFavoritesCount] = useState(0)

    //modal content states & function
    const [modalOpen, setModalOpen] = useState(false)
    const [currentComp, setCurrentComp] = React.useState(0);

    const handleChange = (event, newValue) => {
        setCurrentComp(newValue);
    };
    const handleClose = () => {
        setModalOpen(false)
        setCurrentComp(0)

    };

    const { data: profileData, isLoading: profileLoading } = useGetProfileQuery()
    const { data: pronounList, isLoading: pronounListLoading } = useGetPronounListQuery()
    const { data: raceList, isLoading: raceListLoading } = useGetRaceListQuery()
    const { data: photoList, isLoading: photoLoading } = useGetPhotosQuery({ refetchOnMountOrArgChange: true } )


    //user actions count
    const {data: likedByData, isLoading: likedByDataLoading} = useGetLikedByQuery({ refetchOnMountOrArgChange: true })
    const {data: viewedByData, isLoading: viewedByDataLoading} = useGetViewedByQuery({ refetchOnMountOrArgChange: true })

    const {data: favoritedByData, isLoading: favoritedByDataLoading} = useGetFavoritedByQuery({ refetchOnMountOrArgChange: true })

    useEffect(() => {

        const newViewCount = viewedByData?.responseData?.length

        if(newViewCount > 0){
            setViewsCount(newViewCount)
        }



    }, [viewedByData])

    useEffect(() => {

        const newLikeCount = likedByData?.responseData?.length

        if(newLikeCount > 0){
            setLikesCount(newLikeCount)
        }

    }, [likedByData])

    useEffect(() => {

        const newFavCount = favoritedByData?.responseData?.length

        if(newFavCount > 0){
            setFavoritesCount(newFavCount)
        }

    }, [favoritedByData])




    //const pronoun = ''

    useEffect(() => {

        if (profileLoading) {
            return
        }

        //username
        setUsername(profileData?.responseData?.username)
        setHeight(profileData?.responseData?.height)
        setWeight(profileData?.responseData?.weight)

        const birthday = profileData?.responseData?.birthday

        const tempAge = (birthday?.split('T')[0])?.split('-')[0]
        const today = new Date()
        const currentYear = today?.getFullYear()


        setAge(currentYear - tempAge)


    }, [profileData, profileLoading])

    useEffect(() => {

        if (pronounListLoading) {
            return
        }

        //pronoun
        const pronounId = profileData?.responseData?.pronoun_id
        const pronounObj = pronounList?.responseData?.pronouns?.find((pro) => pro.ID === pronounId)

        if (pronounObj) {
            setPronoun(pronounObj.Pronoun)
        }

    }, [profileData, pronounList, pronounListLoading])


    useEffect(() => {

        if (raceListLoading) {
            return
        }

        const raceId = profileData?.responseData?.race_id
        const raceObj = raceList?.responseData?.races?.find((race) => race.ID === raceId)



        if (raceObj) {
            setRace(raceObj?.Race)
        }

    }, [profileData, raceList, raceListLoading])

    useEffect(() => {

        if (photoLoading) {
            return
        }

        setDp(photoList?.responseData?.pictures[0]?.Url)

    }, [photoList, photoLoading])

    // useEffect(() => {

    //     const fetchUserData = async () => {

    //         try {
    //             const response = await axios.get(`${baseUrl}/api/v1/user/me`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${access_token}`
    //                 }
    //             })

    //             console.log("user", response.data)

    //             if (response.data.isSuccess) {
    //                 setUsername(response.data.responseData.username)

    //             }
    //         }
    //         catch (error) {
    //             alert(error.response.data.message)
    //         }

    //     }
    //     fetchUserData()

    // }, [])





    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: { xs: 'auto', sm: '100vh' }, display: "flex", flexDirection: 'column', backgroundColor: theme.palette.secondary.profile, p: 2 }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Typography sx={{ fontSize: { xs: "1.2rem", sm: '1.4rem', md: "1.6rem", }, fontFamily: 'fontRegular' }}>
                        Profile
                    </Typography>
                </Box>


                {username?.length === 0 ||
                    pronoun?.length === 0 ||
                    age?.length === 0 ||
                    height?.length === 0 ||
                    weight?.length === 0 ||
                    race?.length === 0 ||
                    dp?.length === 0

                    ?

                    // <Box sx={{width: "100%", height: '100%', display: 'flex', flexDirection:'column', justifyContent: 'center', }}>

                    <Stack spacing={1}>

                        <Box sx={{ my: 2, mx: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Skeleton variant='circular' sx={{ width: '200px', height: '200px' }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Skeleton variant='text' sx={{ width: '5rem' }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Skeleton variant='text' sx={{ width: '5rem' }} />
                        </Box>

                        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 3 }}>

                            <Box>
                                <Skeleton variant='text' sx={{ width: '5rem' }} />
                                <Skeleton variant='text' sx={{ width: '5rem' }} />
                            </Box>
                            <Divider orientation='vertical' flexItem sx={{ height: '30px', my: 'auto', backgroundColor: theme.palette.secondary.main }} />
                            <Box>
                                <Skeleton variant='text' sx={{ width: '5rem' }} />
                                <Skeleton variant='text' sx={{ width: '5rem' }} />
                            </Box>

                        </Box>

                        <Box mt={4} sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                            <Skeleton sx={{ width: '18px', }} />

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Skeleton sx={{ width: '25%' }} />
                                <Skeleton variant='text' sx={{ width: '5rem' }} />

                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {/* <PersonOutlineOutlinedIcon /> */}
                                <Skeleton sx={{ width: '25%' }} />
                                <Skeleton variant='text' sx={{ width: '5rem' }} />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {/* <PersonOutlineOutlinedIcon /> */}
                                <Skeleton sx={{ width: '25%' }} />
                                <Skeleton variant='text' sx={{ width: '5rem' }} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {/* <PersonOutlineOutlinedIcon /> */}
                                <Skeleton sx={{ width: '25%' }} />
                                <Skeleton variant='text' sx={{ width: '5rem' }} />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {/* <LocationOnOutlinedIcon /> */}
                                <Skeleton sx={{ width: '25%' }} />
                                <Skeleton variant='text' sx={{ width: '5rem' }} />
                            </Box>

                        </Box>

                    </Stack>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button onClick={() => {
                            setModalOpen(true)
                            setCurrentComp(0)
                        }}
                            sx={{
                                mt: 1,
                                p: 0.6,
                                textTransform: 'none',
                                borderRadius: '20px',
                                width: { xs: '120px', md: '160px' },
                                alignSelf: 'flex-end',
                                display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'nowrap', gap: 1,
                                backgroundColor: theme.palette.background.alt,
                                color: "#000",
                                '&:hover': {
                                    backgroundColor: theme.palette.neutral.light
                                }
                            }}>
                            <VisibilityIcon sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }} />
                            <Typography sx={{ fontSize: { xs: '0.8rem', md: '1.1rem' } }}>
                                {viewsCount} profile views
                            </Typography>
                        </Button>

                        {/*Modal Content Start*/}
                        <Modal
                            open={modalOpen}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{

                                transform: 'auto',
                                mt: { xs: '15%', sm: '5%' },
                                width: { xs: '95%', sm: '70%', md: '50%', lg: '40%' },
                                height: '80%',
                                overflowY: 'scroll',
                                mx: 'auto',
                                bgcolor: theme.palette.background.settingList,
                                p: 2,
                                borderRadius: '8px'
                            }}>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={currentComp} onChange={handleChange} aria-label="basic tabs example" >
                                        <Tab label="Views" {...a11yProps(0)} sx={{ textTransform: 'none', p: 0, fontSize: '1rem', }} />
                                        <Tab label="Likes" {...a11yProps(1)} sx={{ textTransform: 'none', p: 0, fontSize: '1rem' }} />
                                        <Tab label="Favorites" {...a11yProps(2)} sx={{ textTransform: 'none', p: 0, fontSize: '1rem' }} />

                                    </Tabs>
                                </Box>

                                <CustomTabPanel value={currentComp} index={0}>
                                    <ViewedByUserModal />
                                </CustomTabPanel>
                                <CustomTabPanel value={currentComp} index={1}>
                                    <LikedByUserModal />
                                </CustomTabPanel>
                                <CustomTabPanel value={currentComp} index={2}>
                                    <FavoritedByUserModal />
                                </CustomTabPanel>



                            </Box>
                        </Modal>

                        {/*Modal Content End */}

                        <Box>

                            <Box sx={{ my: 2, mx: 'auto', width: { xs: '60%', sm: '100%', md: '50%' }, display: 'flex', justifyContent: 'center' }}>
                                <img src={dp} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: '50%' }} />
                            </Box>

                            <Typography sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.2rem' }}>
                                @{username}
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: '0.8rem', }}>
                                {pronoun}
                            </Typography>

                            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 3 }}>

                                <Button onClick={() => {
                                    setModalOpen(true)
                                    setCurrentComp(1)
                                }}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textTransform: 'none',
                                        color: 'inherit'
                                    }}>
                                    <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, textAlign: 'center' }}>  {likesCount} </Typography>
                                    <Typography sx={{ fontSize: '1rem', textAlign: 'center' }}> Likes </Typography>
                                </Button>
                                <Divider orientation='vertical' flexItem sx={{ height: '30px', my: 'auto', backgroundColor: theme.palette.secondary.main }} />
                                <Button onClick={() => {
                                    setModalOpen(true)
                                    setCurrentComp(2)
                                }}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textTransform: 'none',
                                        color: 'inherit'

                                    }}>
                                    <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem', }, textAlign: 'center' }}> {favoritesCount} </Typography>
                                    <Typography sx={{ fontSize: '1rem', textAlign: 'center' }}> Favorites </Typography>
                                </Button>

                            </Box>

                            <Box mt={4} sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    Profile Summary
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Typography sx={{ width: '25%' }}>
                                        Age:
                                    </Typography>
                                    <Typography>
                                        {age} years old
                                    </Typography>

                                </Box>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {/* <PersonOutlineOutlinedIcon /> */}
                                    <Typography sx={{ width: '25%' }}>
                                        Height:
                                    </Typography>
                                    <Typography>
                                        {height}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {/* <PersonOutlineOutlinedIcon /> */}
                                    <Typography sx={{ width: '25%' }}>
                                        Weight:
                                    </Typography>
                                    <Typography>
                                        {weight}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {/* <PersonOutlineOutlinedIcon /> */}
                                    <Typography sx={{ width: '25%' }}>
                                        Race:
                                    </Typography>
                                    <Typography>
                                        {race}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {/* <LocationOnOutlinedIcon /> */}
                                    <Typography sx={{ width: '25%' }}>
                                        Location:
                                    </Typography>
                                    Texas
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                }

            </Box>
        </ThemeProvider>
    )
}
