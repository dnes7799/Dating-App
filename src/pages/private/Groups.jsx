import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import GroupsList from '../../components/private/group page/GroupsList'
import GroupChat from '../../components/private/group page/GroupChat'
import GroupInfo from '../../components/private/group page/GroupInfo'
import { useSelector } from 'react-redux'

import socket from '../../socket'

export default function Groups() {

  const [newMessage, setNewMessage] = useState([])

  const currentRoomId = useSelector(state => state.message.roomId)
  const groupSelected = useSelector(state => state.message.groupSelected)

  useEffect(() => {

    function onMessageReceived({ content, from, to, roomId }) {

      console.log("socket room id ", roomId)
      console.log("currentRoomId inside socket", currentRoomId)
      console.log(roomId, "has receive message", content, 'and we are currently at', currentRoomId)

      if (roomId === currentRoomId) {
        console.log("hello from equal room id")
        setNewMessage(prevObject => [...prevObject, {
          message: content,
          self: false,
          from: from
        }])

      }

    }

    socket.on("group message", onMessageReceived)


    return () => {
      socket.off("group message", onMessageReceived)
    }

  }, [currentRoomId])

  return (
    <Grid container >

      <Grid item xs={12} sm={4.5} lg={3} sx={{
        display: { xs: !groupSelected ? 'grid' : 'none', sm: 'grid' }
      }} >
        <GroupsList />
      </Grid>

      <Grid item xs={12} sm={7.5} lg={5.5} sx={{
        p: 0,
        display: !groupSelected ? 'none' : 'grid',
      }} >
        <GroupChat newMessage={newMessage} setNewMessage={setNewMessage} />
      </Grid>

      {/* 
      <Grid item xs={12} sm={6} lg={3.5} >
        <GroupInfo />
      </Grid> */}


    </Grid>
  )
}
