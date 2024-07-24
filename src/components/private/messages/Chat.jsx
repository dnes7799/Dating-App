//mui components
import { Box, Divider, Typography, useTheme, ThemeProvider, TextField, InputAdornment, IconButton, AppBar, Skeleton } from '@mui/material'

//mui icons
import AttachmentIcon from '@mui/icons-material/Attachment';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import SendIcon from '@mui/icons-material/Send';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

//other react components and libraries
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import socket from '../../../socket';
import { setShowBottomNav } from '../../../state';
import { setUserSelected } from '../../../reducers/messageSlice';

export default function Chat({ newMessage, setNewMessage }) {

  const theme = useTheme()

  const [msg, setMsg] = useState('')

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  const name = useSelector(state => state.message.username)
  const avatar = useSelector(state => state.message.avatar)
 // const messages = useSelector(state => state.message.messages)
  const online = useSelector(state => state.message.online)
  const talkingTo = useSelector(state => state.message.talkingTo)
  const history = useSelector(state => state.message.history)
  const currentRoomId = useSelector(state => state.message.roomId)

  const messagesEndRef = React.useRef(null);


  // useEffect(() => {

  //   if (history) {
  //     const messages = history.map(item => item.message);
  //     setAllMessages(messages);
  //   }

  // }, [history])

  React.useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }


  const handleMessageSend = (e) => {
    e.preventDefault()

    if (!msg) {
      return
    }

    var content = msg
    socket.emit("private message", {
      content,
      roomId: currentRoomId,
      to: talkingTo,
    });

    setNewMessage(prevObject => [...prevObject, {
      message: msg,
      self: true
    }])

    setMsg('')


  }


  useEffect(() => {

    setLoading(true)

    if (history.length > 0) {
      setLoading(false)
    }


  }, [history])

  useEffect(() => {

    setNewMessage([])
  }, [currentRoomId])


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height:" 100vh" }}>
        <AppBar position='static' sx={{boxShadow: 0, backgroundColor: 'transparent' ,}}>
          <Box sx={{
            width: '100%',
            display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1,
            p: '0.5rem'
          }}>

            <IconButton onClick={() => {
              dispatch(setUserSelected(''))
              dispatch(setShowBottomNav(true))
            }}
              sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <KeyboardBackspaceIcon />
            </IconButton>

            <Box sx={{ display: 'flex', }}>
              <Box>
                <img src={avatar} style={{ width: '100%' }} />
              </Box>
              <Box
                sx={{
                  mt: 4.5,
                  ml: -1.5,
                  backgroundColor: "#fff",
                  borderRadius: '50%',
                  height: '16px',
                  width: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Box sx={{ backgroundColor: online ? 'green' : theme.palette.secondary[400], borderRadius: '50%', width: '12px', height: '12px' }}>
                </Box>
              </Box>
            </Box>

            <Typography color={theme.palette.secondary.main}>
              {name}
            </Typography>

          </Box>
        </AppBar>
        <Divider />

        {loading ?
          <Box sx={{ mt: 2.2, height:  { xs: '83vh', sm: '79vh' } , display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <Box sx={{ width: '70%', alignSelf: 'flex-start', borderRadius: '10px' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-end' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-start', borderRadius: '10px' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-end' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-start', borderRadius: '10px' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-end' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-start', borderRadius: '10px' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-end' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-start', borderRadius: '10px' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-end' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-start', borderRadius: '10px' }}>
              <Skeleton variant='rounded' />
            </Box>
            <Box sx={{ width: '70%', alignSelf: 'flex-end' }}>
              <Skeleton variant='rounded' />
            </Box>



          </Box>


          :
          // <Box>
          //   nothing here
          // </Box>
          <Box sx={{ px: 1, mt: '0.1rem', display: 'flex', flexDirection: 'column', rowGap: 1, overflowY: 'scroll', height: { xs: '85vh', sm: '81vh' } }}>
            {history && history?.map((item, index) => (

              <Box key={index}
                sx={{
                  p: 1,
                  maxWidth: '60%',
                  alignSelf: item.self ? 'flex-end' : 'flex-start',
                  backgroundColor: item.self ? theme.palette.neutral.main : theme.palette.neutral.light,
                  color: item.self ? theme.palette.secondary[0] : "#000",
                  borderRadius: '12px',
                  position: 'relative',
                }}
              >
                <Typography>
                  {item.message}
                </Typography>

              </Box>

            ))}
            {newMessage && newMessage.map((item, index) => (

              <Box key={index}
                sx={{
                  p: 1,
                  maxWidth: '60%',
                  alignSelf: item.self ? 'flex-end' : 'flex-start',
                  backgroundColor: item.self ? theme.palette.neutral.main : theme.palette.neutral.light,
                  color: item.self ? theme.palette.secondary[0] : "#000",
                  borderRadius: '12px',
                  position: 'relative',
                }}
              >
                <Typography>
                  {item.message}
                </Typography>

              </Box>

            ))
            }

            <div ref={messagesEndRef} />
          </Box>


        }
        <Box component='form' onSubmit={handleMessageSend}
          sx={{
            width: '100%',
            p: 1,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end'
          }}>
          <TextField
            fullWidth
            size='small'
            placeholder='Write something..'
            autoComplete='off'
            value={msg}
            //multiline
            onChange={(e) => setMsg(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position='end'>
                <IconButton>
                  <AttachmentIcon />
                </IconButton>
                <IconButton>
                  <LocalSeeIcon />
                </IconButton>
              </InputAdornment>
            }}
            sx={{

              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#B2BAC2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.secondary.main,
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '20px',
                borderColor: theme.palette.grey[500]
              },
            }}
          />

          <IconButton type='submit'>
            <SendIcon />
          </IconButton>

        </Box>


      </Box>
    </ThemeProvider>
  )
}
