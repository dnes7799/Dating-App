import React, { useEffect, useState } from 'react'
import { Box, Typography, InputAdornment, ThemeProvider, useTheme, TextField, IconButton, List, Skeleton, ListItemButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import axios from 'axios'
import { formatDistanceToNow } from "date-fns";

import Avatar1 from '../../../assets/Avatar1.svg'

import { setAvatar, setUsername, setHistory, setTalkingTo, setRoomId, setUserSelected } from '../../../reducers/messageSlice';
import { setShowBottomNav } from '../../../state';
import { useDispatch, useSelector } from 'react-redux';

import { useGetChatRoomsQuery } from '../../../rtkmodules/messages/UsersListServices';
import socket from '../../../socket';



export default function ProfileList() {

    const theme = useTheme()
    const dispatch = useDispatch()
    const [activeProfile, setActiveProfile] = useState('')

    const access_token = localStorage.getItem('access_token')

    const [chatRoomUserIds, setChatRoomUserIds] = useState([])
    const [chatRoomsDetails, setChatRoomsDetails] = useState([])

    const [connectedUsers, setConnectedUsers] = useState([])
    const [userDetails, setUserDetails] = useState([])
    const [usersList, setUsersList] = useState([])
    const [uniqueUsers, setUniqueUsers] = useState([])
    const [uniqueUserDetails, setUniqueUserDetails] = useState([])

    const baseUrl = useSelector(state => state.global.baseUrl)


    // const avatar = useSelector(state => state.message.avatar)
    // const name = useSelector(state => state.message.name)
    // const lastMessage = useSelector(state => state.message.lastMessage)
    // const online = useSelector(state => state.message.online)
    // const time = useSelector(state => state.message.time)

    const { data: chatRoomsData } = useGetChatRoomsQuery()

    useEffect(() => {
        if (chatRoomsData) {
            setChatRoomUserIds(chatRoomsData?.responseData?.roomIds)
        }

    }, [chatRoomsData])


    useEffect(() => {
        const fetchChatRoomDetails = async () => {
            const responses = await Promise.all(chatRoomUserIds?.map(async (id) => {
                const response = await axios({
                    method: 'get',
                    url: `${baseUrl}/api/v1/messages/chats/head/${id}`,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                return response.data.responseData;
            }));
            // Concatenate all responseData arrays into one array
            const allResponsesData = responses.flat();
            setChatRoomsDetails(allResponsesData);
        }

        fetchChatRoomDetails();

    }, [chatRoomUserIds]);


    useEffect(() => {

        const fetchUsers = async () => {
            const responses = await Promise.all(chatRoomsDetails.map(async (user) => {

                const id = user.talkingToUserId

                setUserDetails((prev) => [...prev, user])



                const response = await axios({
                    method: 'get',
                    url: `${baseUrl}/api/v1/user/${id}`,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                return response.data.responseData;
            }));
            // Concatenate all responseData arrays into one array
            const allResponsesData = responses.flat();
            setUsersList(allResponsesData);
        }


        fetchUsers()


    }, [chatRoomsDetails])

    console.log({chatRoomsDetails})



    useEffect(() => {

        const newUsers = usersList.reduce((acc, curr) => {
            if (!acc.some(user => user.ID === curr.ID)) {
                acc.push(curr);
            }
            return acc;
        }, []);


        setUniqueUsers(newUsers)

    }, [usersList])


    useEffect(() => {

        const newData = userDetails.reduce((acc, curr) => {
            if (!acc.some(user => user.talkingToUserId === curr.talkingToUserId)) {
                acc.push(curr);
            }
            return acc;
        }, []);

        setUniqueUserDetails(newData)

    }, [userDetails])

    function mergeArrays(uniqueUsers, uniqueUserDetails) {
        // Create an empty array to store the merged objects
        let mergedArray = [];

        // Iterate over array1
        uniqueUsers.forEach(obj1 => {
            // Find the corresponding object in array2 based on the common id
            let matchingObj2 = uniqueUserDetails.find(obj2 => obj2.talkingToUserId === obj1.ID);

            // If a matching object is found, merge the properties
            if (matchingObj2) {
                let mergedObj = { ...obj1, ...matchingObj2 };
                // Add the merged object to the merged array
                mergedArray.push(mergedObj);
            }
        });

        return mergedArray;
    }

    // Usage
    let mergedUserArrays = mergeArrays(uniqueUsers, uniqueUserDetails);

    const handleMessageClick = (person) => {
        setActiveProfile(person.username)
        dispatch(setUsername(person.username))
        dispatch(setAvatar(Avatar1))
        dispatch(setShowBottomNav(false))

        const chatObj = chatRoomsDetails?.filter((item) => item.talkingToUserId === person.ID)

        console.log("chat object", chatObj)

        const roomId = chatObj[0]?.roomId

        dispatch(setTalkingTo(chatObj[0]?.talkingToUserId))
        dispatch(setRoomId(chatObj[0]?.roomId))

        if (roomId) {
            const fetchChatHistory = async () => {
                dispatch(setHistory([]))
                const response = await axios({
                    method: 'get',
                    url: `${baseUrl}/api/v1/messages/chat/${roomId}`,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                dispatch(setHistory(response?.data?.responseData))

            }
            fetchChatHistory()
        }

    }


    // socket.on("user connected", ({userID, connected, username}) => {
        
    //     console.log("user id", userID)
    //     console.log("user name", username)
    //     console.log("usr connected", connected)
    //     setConnectedUsers([...userID])
    // })


    // console.log({connectedUsers})

    console.log({mergedUserArrays})

    return (

        <Box sx={{ py: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>

            <Box sx={{ px: 2 }}>
                <Typography sx={{ fontSize: { xs: '24px', sm: '30px' }, fontFamily: 'fontRegular' }}>
                    Message
                </Typography>
                <Typography sx={{ mt: 1, fontSize: '18px' }}>
                    Send message privately or join groups of your interests.
                </Typography>

                <TextField fullWidth
                    size='small'
                    placeholder='Search'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}

                    sx={{
                        mt: 4,
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#B2BAC2',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.secondary.main,
                            },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderRadius: '100px',
                            borderColor: theme.palette.secondary.main,
                        },

                        '& .MuiOutlinedInput-input': {
                            color: theme.palette.secondary.main,

                        },

                    }}
                />

                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>
                        Messages
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography>
                            Chat Filter
                        </Typography>

                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>

                {
                    mergedUserArrays.length === 0 ?
                        <>
                            <Box sx={{ p: 1, mb: 1,  display: 'flex', flexDirection: 'row', gap: 2 }}>
                                <Skeleton variant="circular" width={50} height={50} />
                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Skeleton variant="rounded" width='100%' />

                                    <Skeleton variant="rounded" width='100%' />

                                </Box>
                            </Box>
                            <Box sx={{ p: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
                                <Skeleton variant="circular" width={50} height={50} />
                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Skeleton variant="rounded" width='100%' />

                                    <Skeleton variant="rounded" width='100%' />

                                </Box>
                            </Box>
                        </>
                        :

                        mergedUserArrays && mergedUserArrays.length > 0 && mergedUserArrays.map((person, index) => (
                            <ListItemButton key={index} onClick={() => {
                                handleMessageClick(person)
                                dispatch(setUserSelected(person.username))
                            }}
                                sx={{
                                    p: 1,
                                    backgroundColor: activeProfile === person.username ? theme.palette.background.msg : "",
                                    borderLeft: activeProfile === person.username ? '2px solid #006BFA' : '',
                                    // '&:hover':{
                                    //     backgroundColor: '#e6f1ff'
                                    // }
                                }}
                            >
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <Box>
                                            <img src={Avatar1} style={{}} />
                                        </Box>
                                        <Box
                                            sx={{
                                                mb: '0.4rem',
                                                ml: '-0.85rem',
                                                backgroundColor: "#fff",
                                                borderRadius: '50%',
                                                height: '16px',
                                                width: '16px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Box sx={{ backgroundColor: person.online ? 'green' : theme.palette.secondary[400], borderRadius: '50%', width: '12px', height: '12px' }}>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={{ flexGrow: 1 }} >
                                        <Typography sx={{ fontWeight: 'bold', }}>
                                            {person.username}
                                        </Typography>
                                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}>
                                            <Box>

                                                {(() => {

                                                    // const msgLength = person.messages.length

                                                    // if (person.messages[msgLength - 1].sender === 'user') {

                                                    //     return (
                                                    //         <Typography sx={{
                                                    //             width: '100%',
                                                    //             maxWidth: { xs: "120px", sm: '80px', md: '150px', lg: '100px' },
                                                    //             overflow: 'hidden',
                                                    //             textOverflow: 'ellipsis',
                                                    //             whiteSpace: 'nowrap'

                                                    //         }}>You: {person.messages[msgLength - 1].content}</Typography>
                                                    //     )
                                                    // }
                                                    // else {

                                                    //     return (
                                                    //         <Typography sx={{
                                                    //             width: '100%',
                                                    //             maxWidth: { xs: "120px", sm: '80px', md: '150px', lg: '100px' },
                                                    //             overflow: 'hidden',
                                                    //             textOverflow: 'ellipsis',
                                                    //             whiteSpace: 'nowrap'
                                                    //         }}>
                                                    //             {person.messages[msgLength - 1].content}
                                                    //         </Typography>
                                                    //     )
                                                    // }

                                                    if (person.self) {

                                                        return (
                                                            <Typography sx={{
                                                                width: '100%',
                                                                maxWidth: { xs: "120px", sm: '80px', md: '150px', lg: '100px' },
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'

                                                            }}>You: {person.message}</Typography>
                                                        )
                                                    } else {
                                                        return (
                                                            <Typography sx={{
                                                                width: '100%',
                                                                maxWidth: { xs: "120px", sm: '80px', md: '150px', lg: '100px' },
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                {person.message}
                                                            </Typography>
                                                        )
                                                    }

                                                })()}
                                            </Box>

                                            {/* 
                                    {person.lastMessage.length === 0 ?

                                        <Typography>
                                            You: {person?.yourLastMessage}
                                        </Typography>
                                        :
                                        <Typography sx={{ fontWeight: 'bold' }}>
                                            {person.lastMessage}
                                        </Typography>


                                    } */}
                                            <Box sx={{
                                            }}>
                                                <Typography>
                                                    {formatDistanceToNow(new Date(person.createdAt))} ago.
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>


                                </Box>
                            </ListItemButton>
                        ))}

            </Box>


        </Box>
    )
}
