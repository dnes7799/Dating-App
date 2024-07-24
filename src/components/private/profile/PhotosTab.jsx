import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, IconButton, Typography } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: '1 day ago',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: '2 day ago',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: '4 days ago',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: '6 days ago',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: '8 days ago',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: '2 weeks ago',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: '1 month ago',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: '6 weeks ago',
    },

];

export default function PhotosTab() {

    // const access_token = localStorage.getItem('access_token')


    // React.useEffect(() => {
    //     const fetchImages = async () => {

    //         const response = await axios.get(`${baseUrl}/api/v1/user/pictures`, {
    //             headers: {
    //                 "Authorization": `Bearer ${access_token}`
    //             }
    //         })

    //     }

    //     fetchImages()

    // }, [])

    return (
        <ImageList sx={{ width: '100%', height: '100%' }} cols={4}>
            {itemData.map((item) => (
                <ImageListItem key={item.img} sx={{ mb: 2 }}>
                    <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <Box sx={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <Typography sx={{ mt: 1 }}>
                            {item.title}
                        </Typography>
                        <IconButton>
                            <MoreVertOutlinedIcon />
                        </IconButton>
                    </Box>
                </ImageListItem>
            ))}
        </ImageList>
    );
}

