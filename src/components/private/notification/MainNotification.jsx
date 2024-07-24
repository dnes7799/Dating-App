//react 
import React from 'react'

//other libraries
import { formatDistanceToNow } from "date-fns";


//mui componentns
import { Box, IconButton, Typography } from '@mui/material'

//icons
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

//assets import
import Avatar1 from '../../../assets/Avatar1.svg'
import Avatar2 from '../../../assets/Avatar2.svg'
import Avatar3 from '../../../assets/Avatar3.svg'
import Avatar4 from '../../../assets/Avatar4.svg'
import view from '../../../assets/view.svg'
import profileLike from '../../../assets/profileLike.svg'
import { useNavigate } from 'react-router-dom';



const notificationsList = [
  {
    id: 1,
    img: Avatar1,
    name: "Omar Kenter",
    action: 'viewed',
    timestamp: "2024-01-29T05:42:00Z"
  },
  {
    id: 2,
    img: Avatar2,
    name: "Emily Johnson",
    action: 'liked',
    timestamp: "2024-01-28T06:10:00Z"
  },
  {
    id: 3,
    img: Avatar3,
    name: "Maxwell Rodriguez",
    action: 'viewed',
    timestamp: "2024-01-29T07:25:00Z"
  },

  {
    id: 4,
    img: Avatar4,
    name: "Sophia Lee",
    action: 'liked',
    timestamp: "2024-01-29T08:03:00Z"
  },
  {
    id: 5,
    img: Avatar3,
    name: "Daniel Smith",
    action: 'viewed',
    timestamp: "2024-01-29T09:55:00Z"
  },
  {
    id: 6,
    img: Avatar2,
    name: "Olivia Garcia",
    action: 'liked',
    timestamp: "2024-01-25T00:30:00Z"
  },
  {
    id: 7,
    img: Avatar1,
    name: "Liam Martinez",
    action: 'viewed',
    timestamp: "2024-01-22T21:14:00Z"
  },
  {
    id: 8,
    img: Avatar3,
    name: "Ava Brown",
    action: 'liked',
    timestamp: "2024-01-29T12:02:00Z"
  },
  {
    id: 9,
    img: Avatar4,
    name: "Noah Wilson",
    action: 'viewed',
    timestamp: "2024-01-22T22:45:00Z"
  },
  {
    id: 10,
    img: Avatar1,
    name: "Emma Anderson",
    action: 'liked',
    timestamp: "2024-01-24T23:20:00Z"
  },
  {
    id: 11,
    img: Avatar3,
    name: "Alexander Taylor",
    action: 'viewed',
    timestamp: "2024-01-25T23:59:00Z"
  }


]

export default function MainNotification() {


  const navigate = useNavigate()

  const currentDate = new Date().toISOString().slice(0, 10)

  const sortedNotifications = notificationsList?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const todayNotifications = sortedNotifications?.filter((notification) => notification.timestamp.slice(0, 10) === currentDate)

  const olderNotifications = sortedNotifications?.filter((notification) => notification.timestamp.slice(0, 10) !== currentDate)

  return (
    <Box sx={{ p: 1.5 }} >

      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: '0.2rem', sm: '0.5rem' }, alignItems: 'center' }}>

        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={ () => navigate('/home')}
        >
          <KeyboardBackspaceIcon />
        </IconButton>

        <Typography sx={{ fontSize: { xs: "1.2rem", sm: '1.4rem', md: "1.6rem", }, fontFamily: 'fontRegular' }}>
          Notification
        </Typography>
{/* 
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
            Filter
          </Typography>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box> */}
      </Box>
      <Box sx={{ mt: { xs: 1, sm: 5 }, display: 'flex', flexDirection: 'column', }}>

        {todayNotifications.length !== 0 ? <Typography mb={1}>Today</Typography> : null}
        {todayNotifications && todayNotifications.map((item) => (

          <Box key={item.id} sx={{ ml: 1, mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

            {/*for iamge and notification details*/}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>

              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                  <img src={item.img} alt={item.src} />
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  alignSelf: 'flex-end',
                  p: '0.2rem',
                  backgroundColor: '#fff',
                  ml: -2.5,
                  mb: 0.5
                }}>
                  {item.action === 'viewed' ? <img src={view} /> : <img src={profileLike} />}
                </Box>

              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>
                  {item.name} {item.action} your profile
                </Typography>
                <Typography>
                  {formatDistanceToNow(new Date(item.timestamp))} ago
                </Typography>

              </Box>
            </Box>


            {/*Box for three dot icon*/}
            <Box>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>


          </Box>

        ))}

        {olderNotifications.length !== 0 ? <Typography mb={1}>Older</Typography> : null}
        {olderNotifications && olderNotifications.map((item) => (

          <Box key={item.id} sx={{ ml: 1, mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

            {/*for iamge and notification details*/}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>

              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                  <img src={item.img} alt={item.src} />
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  alignSelf: 'flex-end',
                  p: '0.2rem',
                  backgroundColor: '#fff',
                  ml: -2.5,
                  mb: 0.5
                }}>
                  {item.action === 'viewed' ? <img src={view} /> : <img src={profileLike} />}
                </Box>

              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>
                  {item.name} {item.action} your profile
                </Typography>
                <Typography>
                  {formatDistanceToNow(new Date(item.timestamp))} ago
                </Typography>

              </Box>
            </Box>


            {/*Box for three dot icon*/}
            <Box>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>


          </Box>

        ))}

      </Box>



    </Box>
  )
}
