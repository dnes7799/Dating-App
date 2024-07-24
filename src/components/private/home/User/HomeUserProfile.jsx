import React, { useState, useEffect } from 'react'
import { Box, Button, useTheme, ThemeProvider, Typography, Divider, IconButton, Modal, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';

import {
    useGetPronounListQuery,
    useGetRaceListQuery
} from '../../../../rtkmodules/profile/profileServices'

import { useGetOtherUserPhotosQuery, useLikeUserMutation, useFavoriteUserMutation, useIgnoreUserMutation } from '../../../../rtkmodules/home/RecommededUsers'

import { useNavigate } from 'react-router-dom';
import RedCross from '../../../../assets/RedCross.svg'
import Like from '../../../../assets/Like.svg'
import Favorite from '../../../../assets/Favorite.svg'
import profileLike from '../../../../assets/profileLike.svg'
import Favorited from '../../../../assets/Favorited.svg'
// import { useLikeUserMutation, useFavoriteUserMutation, useIgnoreUserMutation } from '../../../../rtkmodules/home/RecommendedUsers';

import { usePostNewMessageMutation } from '../../../../rtkmodules/messages/UsersListServices';

export default function HomeUserProfile({ userObj }) {

    const theme = useTheme()
    const navigate = useNavigate()
    const [dp, setDp] = useState('')
    const [pronoun, setPronoun] = useState("")
    const [age, setAge] = useState("")
    const [race, setRace] = useState("")
    const [likeCount, setLikeCount] = useState(userObj?.likes)
    const [favCount, setFavCount] = useState(userObj?.favourites)
    const [tempLike, setTempLike] = useState(userObj?.is_liked)
    const [tempFavorite, setTempFavorite] = useState(userObj?.is_favourited)

    const [open, setOpen] = useState(false)
    const [newMsg, setNewMsg] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [message, {data: sendMessageData}] = usePostNewMessageMutation()
    const [like, { data: likeData, isLoading: likeUpdating, isSuccess: likeSuccess, isError: likeError }] = useLikeUserMutation()
    const [favorite, { data: favoriteData, isLoading: favoriteUpdating, isSuccess: favoriteSuccess, isError: favoriteError }] = useFavoriteUserMutation()
    const [ignore, { isLoading: ignoreUpdating }] = useIgnoreUserMutation()

    const { data: pronounList, isLoading: pronounListLoading } = useGetPronounListQuery()
    const { data: raceList, isLoading: raceListLoading } = useGetRaceListQuery()
    const { data: otherUserPhotos, isLoading: otherUserPhotosLoading } = useGetOtherUserPhotosQuery(userObj?.ID)

    //console.log(userObj)
    useEffect(() => {
        const birthday = userObj?.birthday
        const tempAge = (birthday?.split('T')[0])?.split('-')[0]
        const today = new Date()
        const currentYear = today?.getFullYear()

        setAge(currentYear - tempAge)

    }, [userObj])

    useEffect(() => {

        otherUserPhotos?.responseData?.pictures?.map((image) => {

            const isProfilePic = image?.ProfilePic
            if (isProfilePic) {
                setDp(image?.Url)
            }

        })


    }, [otherUserPhotos, otherUserPhotosLoading])

    useEffect(() => {
        if (pronounListLoading) {
            return
        }

        //pronoun
        const pronounId = userObj?.pronoun_id
        const pronounObj = pronounList?.responseData?.pronouns?.find((pro) => pro.ID === pronounId)

        if (pronounObj) {
            setPronoun(pronounObj.Pronoun)
        }

    }, [pronounList, pronounListLoading])

    useEffect(() => {

        if (raceListLoading) {
            return
        }

        const raceId = userObj?.race_id
        const raceObj = raceList?.responseData?.races?.find((race) => race.ID === raceId)


        if (raceObj) {
            setRace(raceObj?.Race)
        }

    }, [raceList, raceListLoading])



    const handleIgnore = (id) => {
        console.log('ignored', id)
        try {
            ignore({
                ignored_user_id: id
            })
            navigate('/home')
        } catch (error) {
            console.error('error in ignore', error)
        }

    }


    const handleLike = (id) => {
        console.log('liked', id)
        console.log("tempLike", tempLike)
        if (tempLike && tempLike > 0) {
            setLikeCount(likeCount - 1)
        }
        else (
            setLikeCount(likeCount + 1)
        )
        setTempLike(!tempLike)

        try {
            like({
                liked_user_id: id
            })
        } catch (error) {
            console.error('like error', error)
        }

    }

    const handleFavorite = (id) => {
        console.log('favorited', id)

        if (tempFavorite) {
            setFavCount(favCount - 1)
        }
        else (
            setFavCount(favCount + 1)
        )

        setTempFavorite(!tempFavorite)
        favorite({
            favourited_user_id: id
        })

    }

    useEffect(() => {
        console.log("userObj", userObj)
        setTempLike(userObj?.is_liked)
        setTempFavorite(userObj?.is_favourited)
        setLikeCount(userObj?.likes)
        setFavCount(userObj?.favourites)
    }, [userObj])

    useEffect(() => {

        if (likeError) {
            setLikeCount(likeCount - 1)
            setTempLike(!tempLike)
        }

    }, [likeError])

    useEffect(() => {

        console.log('fav error', favoriteError)
        if (favoriteError) {
            setFavCount(favCount - 1)
            setTempFavorite(!tempFavorite)
        }

    }, [favoriteError])

    console.log({userObj})

    const handleSendNewMsg = () => {
        console.log('clikced on send message')

        message({
            to: userObj?.ID,
            message: newMsg
        }).then(
            handleClose(),
            navigate('/messages')

        )

    }
    console.log(sendMessageData)


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ p: 2 }}>
                <Box>
                    <IconButton onClick={() => navigate('/home')}>
                        <ArrowBackIcon />
                    </IconButton>

                </Box>
                <Box sx={{ my: 2, mx: 'auto', width: { xs: '60%', sm: '100%', md: '80%' }, display: 'flex', justifyContent: 'center' }}>
                    <img src={dp} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: '50%' }} />
                </Box>

                <Typography sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.2rem' }}>
                    @{userObj?.username}
                </Typography>
                <Typography sx={{ textAlign: 'center', fontSize: '1rem', }}>
                    {pronoun}
                </Typography>

                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 3 }}>

                    <Box>
                        <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem', }, textAlign: 'center' }}> {likeCount}</Typography>
                        <Typography sx={{ fontSize: '0.9rem', textAlign: 'center' }}> Likes </Typography>
                    </Box>
                    <Divider orientation='vertical' flexItem sx={{ height: '30px', my: 'auto', backgroundColor: theme.palette.secondary.main }} />
                    <Box>
                        <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem', textAlign: 'center' } }}> {favCount}</Typography>
                        <Typography sx={{ fontSize: '0.9rem', textAlign: 'center' }}> Favorites </Typography>
                    </Box>

                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography>
                        {userObj?.bio}
                    </Typography>
                </Box>

                <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
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
                            {userObj?.height}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* <PersonOutlineOutlinedIcon /> */}
                        <Typography sx={{ width: '25%' }}>
                            Weight:
                        </Typography>
                        <Typography>
                            {userObj?.weight}
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
                        {userObj?.location}
                    </Box>

                </Box>

                <Button variant='contained' sx={{ mt: 2 }} onClick={handleOpen}>
                    Message
                </Button>

                <Modal
                    open={open}
                    onClose={handleClose}

                   >
                    <Box  sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        p: 4,
                        display:'flex',
                        flexDirection:'column',
                        rowGap: 1
                    }}>
                        <TextField
                            placeholder='Type your message.. '
                            value={newMsg}
                            onChange={(e) => setNewMsg(e.target.value)}

                        />
                        <Button variant='contained' onClick={handleSendNewMsg} >
                            Send
                        </Button>
                    </Box>

                </Modal>

                <Box sx={{
                    mt: 2,
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    gap: 2,

                }}>

                    <Button onClick={() => handleIgnore(userObj?.ID)}
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
                    <Button onClick={() => handleFavorite(userObj?.ID)}
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

                        <img src={tempFavorite ? Favorited : Favorite} />

                    </Button>
                    <Button onClick={() => setTimeout(handleLike(userObj?.ID), 5000)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            border: !tempLike ? '1px solid #D3FBD0' : '1px solid #FBD0D2',
                            p: 1,
                            minWidth: 0,
                            color: 'green'
                        }}>

                        <img src={tempLike ? profileLike : Like} />

                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
