import { Box, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ProfileList from '../../components/private/messages/ProfileList'
import Chat from '../../components/private/messages/Chat'
import ProfileDetails from '../../components/private/messages/ProfileDetails'
import { useSelector } from 'react-redux'

import socket from '../../socket'

export default function Messages() {

  //global states
  const currentRoomId = useSelector(state => state.message.roomId)

  const userSelected = useSelector(state => state.message.userSelected)

  const [newMessage, setNewMessage] = useState([])
  //const [userSelected, setUserSelected] = useState('')

  useEffect(() => {

    function onMessageReceived({ content, from, to, roomId }) {

      console.log("socket room id ", roomId)
      console.log("currentRoomId inside socket", currentRoomId)
      console.log(roomId, "has receive message", content, 'and we are currently at', currentRoomId)

      if (roomId === currentRoomId) {
        console.log("hello from equal room id")
        setNewMessage(prevObject => [...prevObject, {
          message: content,
          self: false
        }])

      }

    }

    socket.on("private message", onMessageReceived)


    return () => {
      socket.off("private message", onMessageReceived)
    }

  }, [currentRoomId])

  socket.on("connect", () => { console.log(socket) })
  
  console.log("socket", socket)

  return (

    <Grid container >
      <Grid item xs={12} sm={4.5} lg={3} sx={{
        display: { xs: !userSelected ? 'grid' : 'none', sm: 'grid' }
      }} >
        <ProfileList  />
      </Grid>
      <Grid item xs={12} sm={7.5} lg={5.5} sx={{
        p: 0,
        display: !userSelected ? 'none' : 'grid',
      }}>
        <Chat newMessage={newMessage} setNewMessage={setNewMessage}  />
      </Grid>
      <Grid item xs={12} sm={6} lg={3.5} sx={{ display: { xs: 'none', lg: !userSelected ? 'none' : 'grid' } }} >
        <ProfileDetails />
      </Grid>


    </Grid>
  )
}
