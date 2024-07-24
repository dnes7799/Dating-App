import React, { useEffect, useState } from 'react'
import { Box, Typography, InputAdornment, ThemeProvider, useTheme, TextField, IconButton, List, Skeleton, ListItemButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import axios from 'axios'
import { formatDistanceToNow } from "date-fns";

import Avatar1 from '../../../assets/Avatar1.svg'

import { setAvatar, setUsername, setHistory, setTalkingTo, setRoomId, setGroupSelected } from '../../../reducers/messageSlice';
import { setShowBottomNav } from '../../../state';
import { useDispatch, useSelector } from 'react-redux';

import { useGetGroupChatRoomsQuery } from '../../../rtkmodules/messages/UsersListServices';

export default function GroupsList() {

  const theme = useTheme()
  const dispatch = useDispatch()
  const [activeProfile, setActiveProfile] = useState('')

  const access_token = localStorage.getItem('access_token')

  const [chatRoomUserIds, setChatRoomUserIds] = useState([])
  const [chatRoomsDetails, setChatRoomsDetails] = useState([])

  const [groupDetails, setGroupDetails] = useState([])
  const [groupsList, setGroupsList] = useState([])


  const baseUrl = useSelector(state => state.global.baseUrl)

  const { data: groupChatRoomsData } = useGetGroupChatRoomsQuery()

  useEffect(() => {
    if (groupChatRoomsData) {
      setChatRoomUserIds(groupChatRoomsData?.responseData?.roomIds)
    }

  }, [groupChatRoomsData])

  console.log(chatRoomUserIds)


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

  console.log({chatRoomsDetails})

  // useEffect(() => {

  //   const fetchUsers = async () => {
  //     const responses = await Promise.all(chatRoomsDetails.map(async (user) => {

  //       const id = user.talkingToUserId

  //       setGroupDetails((prev) => [...prev, user])

  //       const response = await axios({
  //         method: 'get',
  //         url: `${baseUrl}/api/v1/user/${id}`,
  //         headers: {
  //           'Authorization': `Bearer ${access_token}`
  //         }
  //       });
  //       return response.data.responseData;
  //     }));
  //     // Concatenate all responseData arrays into one array
  //     const allResponsesData = responses.flat();
  //     setGroupsList(allResponsesData);
  //   }


  //   fetchUsers()


  // }, [chatRoomsDetails])

  const handleMessageClick = (group) => {
    setActiveProfile(group.roomId)
    dispatch(setUsername(group.title))
    dispatch(setAvatar(Avatar1))
    // dispatch(setShowBottomNav(false))

    const roomId = group.roomId

    dispatch(setRoomId(group?.roomId))

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



  return (
    <Box>

      <Box sx={{ px: 2 }}>
        <Typography sx={{ fontSize: { xs: '24px', sm: '30px' }, fontFamily: 'fontRegular' }}>
          Groups
        </Typography>
        <Typography sx={{ mt: 1, }}>
          Find groups of our interest and engage with people of similar interests
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
      </Box>

      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>

        {
          chatRoomsDetails.length === 0 ?
            <>
              <Box sx={{ p: 1, mb: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
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

            chatRoomsDetails && chatRoomsDetails.length > 0 && chatRoomsDetails.map((group, index) => (
              <ListItemButton key={index} onClick={() => {
                handleMessageClick(group)
                dispatch(setGroupSelected(group.roomId))
              }}
                sx={{
                  p: 1,
                  backgroundColor: activeProfile === group.roomId ? theme.palette.background.msg : "",
                  borderLeft: activeProfile === group.roomId ? '2px solid #006BFA' : '',
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
                      <Box sx={{ backgroundColor: group.online ? 'green' : theme.palette.secondary[400], borderRadius: '50%', width: '12px', height: '12px' }}>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ flexGrow: 1 }} >
                    <Typography sx={{ fontWeight: 'bold', }}>
                      {group.title}
                    </Typography>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}>
                      <Box>

                        {(() => {

                          // const msgLength = group.messages.length

                          // if (group.messages[msgLength - 1].sender === 'user') {

                          //     return (
                          //         <Typography sx={{
                          //             width: '100%',
                          //             maxWidth: { xs: "120px", sm: '80px', md: '150px', lg: '100px' },
                          //             overflow: 'hidden',
                          //             textOverflow: 'ellipsis',
                          //             whiteSpace: 'nowrap'

                          //         }}>You: {group.messages[msgLength - 1].content}</Typography>
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
                          //             {group.messages[msgLength - 1].content}
                          //         </Typography>
                          //     )
                          // }

                          if (group.self) {

                            return (
                              <Typography sx={{
                                width: '100%',
                                maxWidth: { xs: "120px", sm: '80px', md: '150px', lg: '100px' },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'

                              }}>You: {group.message}</Typography>
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
                                {group.message}
                              </Typography>
                            )
                          }

                        })()}
                      </Box>

                      {/* 
                    {group.lastMessage.length === 0 ?

                        <Typography>
                            You: {group?.yourLastMessage}
                        </Typography>
                        :
                        <Typography sx={{ fontWeight: 'bold' }}>
                            {group.lastMessage}
                        </Typography>


                    } */}
                      <Box sx={{
                      }}>
                        <Typography>
                          {formatDistanceToNow(new Date(group.createdAt))} ago.
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
