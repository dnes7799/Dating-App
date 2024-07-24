import React, { useEffect, useState } from 'react'
import { Box, Typography, ImageListItem, ImageList, IconButton, Grid, Skeleton } from '@mui/material'
import axios from 'axios'
import { useGetPhotosQuery } from '../../../rtkmodules/photos/photosServices'
import { useSelector } from 'react-redux'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { formatDistanceToNow } from "date-fns";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useGetOtherUserPhotosQuery } from '../../../rtkmodules/home/RecommededUsers'

export default function AllTab({ userId }) {
  const access_token = localStorage.getItem('access_token')

  const [images, setImages] = useState([])
  const [imageBlobs, setImageBlobs] = useState([])
  const [skip, setSkip] = useState(
    userId ? false : true
  )

  const { data: userPhotos, isLoading: userPhotosLoading, refetch: photoRefetch } = useGetPhotosQuery({skip: !skip,  refetchOnMountOrArgChange: true })
  const { data: otherUserPhotos, isLoading: otherUserLoading } = useGetOtherUserPhotosQuery(userId, { skip, refetchOnMountOrArgChange: true})

  useEffect(() => {
    if (userId) {
      setImages(otherUserPhotos?.responseData?.pictures)
    }
    else {
      setImages(
        userPhotos?.responseData?.pictures
      );
    }
  }, [userPhotos, otherUserPhotos])

  // useEffect(() => {
  //   const fetchImageBlobs = async () => {
  //     const blobArray = await Promise.all(
  //       userPhotos?.responseData?.pictures?.map(async (image) => {
  //         const response = await fetch(`${baseUrl}/api/v1/user/picture/${image}`,
  //           {
  //             headers: {
  //               'Authorization': `Bearer ${access_token}`
  //             }
  //           })
  //         const blob = await response.blob()
  //         return URL.createObjectURL(blob);
  //       })
  //     )

  //     setImageBlobs(blobArray)
  //   }

  //   fetchImageBlobs()

  // }, [userPhotos])

  return (
    <>
      {userPhotosLoading ?
        <Grid container spacing={1} sx={{ mt: 2 }}>

          <Grid item xs={4} >
            <Skeleton variant='rectangular' sx={{ width: '100%', height: '250px' }} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton variant='rectangular' sx={{ width: '100%', height: '250px' }} />
          </Grid>
          <Grid item xs={4} >
            <Skeleton variant='rectangular' sx={{ width: '100%', height: '250px' }} />
          </Grid>


        </Grid>

        :
        // <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        <Grid container spacing={0} sx={{}}>

          {images && images?.map((item) => (
            <Grid item key={item.Url}
              xs={4}
              sx={{
                p: 0.1
              }}
            >
              <Box>
                <Zoom>
                  <img
                    src={item.Url}
                    loading="lazy"
                    style={{ width: '100%', aspectRatio: 1 / 1, objectFit: 'cover', borderRadius: '4px' }}
                  />
                </Zoom>
              </Box>
              <Box sx={{ mt: 0.5, display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between', width: '100%' }}>
                <Typography sx={{ mt: 1 }}>
                  {formatDistanceToNow(new Date(item.CreatedAt))} ago.
                </Typography>
                <IconButton>
                  <MoreVertOutlinedIcon />
                </IconButton>
              </Box>
            </Grid>


          ))}
        </Grid>

        // <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>

        //   {images && images?.map((item) => (
        //     <Box sx={{
        //       position: 'relative', flexBasis: '33%', px: '0.15rem',
        //       display: 'grid',
        //       gridTemplateColumns: 'repeat(auto-fit, minmax(33%, 1fr))',

        //     }}>
        //       <Zoom>
        //         <img
        //           src={item.Url}
        //           alt={item.Url}
        //           loading="lazy"
        //           style={{ maxWidth: '100%', aspectRatio: 1 / 1, objectFit: 'cover', borderRadius: '4px' }}
        //         />
        //       </Zoom>

        //       {/* <Box sx={{ mt: 0.5, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        //         <Typography sx={{ mt: 1 }}>
        //           {formatDistanceToNow(new Date(item.CreatedAt))} ago.
        //         </Typography>
        //         <IconButton>
        //           <MoreVertOutlinedIcon />
        //         </IconButton>
        //       </Box> */}

        //     </Box>
        //   ))}

        // </Box>

        // </Box>
      }
    </>
  )
}
