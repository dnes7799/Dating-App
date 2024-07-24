import React, { useCallback, useState, } from 'react'
import axios from 'axios';
import { Box, Typography, Grid, Button, styled, IconButton, useTheme } from '@mui/material'
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import DropImage from '../../../assets/DropImage.svg'
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import Add from '../../../assets/Add.svg'

import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

const FlexCont = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))

export default function PhotoStep({ onNext, baseUrl, access_token }) {

    const theme = useTheme()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [image1, setImage1] = useState([])
    const [image2, setImage2] = useState([])
    const [image3, setImage3] = useState([])
    const [image4, setImage4] = useState([])
    const [files, setFiles] = useState([])
    const uploadFiles = []

    const [uploadFileObj1, setUploadFileObj1] = useState([])
    const [uploadFileObj2, setUploadFileObj2] = useState([])
    const [uploadFileObj3, setUploadFileObj3] = useState([])
    const [uploadFileObj4, setUploadFileObj4] = useState([])

    // var uploadFileObj1, uploadFileObj2, uploadFileObj3, uploadFileObj4

    const dispatch = useDispatch()

    const onDropImage1 = useCallback(acceptedFiles => {

        const newImgPaths = acceptedFiles.map((file) => URL.createObjectURL(file))

        // console.log("Accepted Files")
        // console.log(acceptedFiles[0])

        setUploadFileObj1([...uploadFileObj1, acceptedFiles[0]])
        setImage1([...image1, ...newImgPaths])

    }, [image1]);

    const onDropImage2 = useCallback(acceptedFiles => {

        const newImgPaths = acceptedFiles.map((file) => URL.createObjectURL(file))

        // console.log("Accepted Files")
        // console.log(acceptedFiles[0])

        setUploadFileObj2([...uploadFileObj2, acceptedFiles[0]])
        setImage2([...image2, ...newImgPaths,])
    }, [image2]);


    const onDropImage3 = useCallback(acceptedFiles => {

        const newImgPaths = acceptedFiles.map((file) => URL.createObjectURL(file))

        console.log("Accepted Files")
        console.log(acceptedFiles[0])

        setUploadFileObj3([...uploadFileObj3, acceptedFiles[0]])
        setImage3([...image3, ...newImgPaths,])

    }, [image3]);

    const onDropImage4 = useCallback(acceptedFiles => {

        const newImgPaths = acceptedFiles.map((file) => URL.createObjectURL(file))

        // console.log("Accepted Files")
        // console.log(acceptedFiles[0])

        setUploadFileObj4([...uploadFileObj4, acceptedFiles[0]])
        setImage4([...image4, ...newImgPaths,])
    }, [image4]);


    const { acceptedFiles: image1File, getRootProps: getImage1RootProps, getInputProps: getImage1InputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': []
        },
        maxFiles: 1,
        onDrop: onDropImage1

    });
    const { acceptedFiles: image2File, getRootProps: getImage2RootProps, getInputProps: getImage2InputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': []
        },
        maxFiles: 1,
        onDrop: onDropImage2

    });
    const { acceptedFiles: image3File, getRootProps: getImage3RootProps, getInputProps: getImage3InputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': []
        },
        maxFiles: 1,
        onDrop: onDropImage3

    });
    const { acceptedFiles: image4File, getRootProps: getImage4RootProps, getInputProps: getImage4InputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': []
        },
        maxFiles: 1,
        onDrop: onDropImage4

    });

    const handleNext = async () => {

        if(!image1.length > 0 || !image2.length>0 || !image3.length>0 || !image4.length>0 ){
            swal({
                icon:'error',
                text:"You must upload all images."
            })

            return
        }

        var data = new FormData()
        var uploadData = {}

        let blob1 = await fetch(image1[0]).then(r => r.blob());
        let blob2 = await fetch(image2[0]).then(r => r.blob());
        let blob3 = await fetch(image3[0]).then(r => r.blob());
        let blob4 = await fetch(image4[0]).then(r => r.blob());



        uploadFiles.push(blob1)
        uploadFiles.push(blob2)
        uploadFiles.push(blob3)
        uploadFiles.push(blob4)

        uploadFiles.forEach((file,) => {
            data.append('upload[]', file, file.name)
        })

 

        try {
            setLoading(true)
            const response = await axios({
                method: "post",
                url: `${baseUrl}/api/v1/user/me/pictures`,
                data: data,
                headers: {
                    "Content-Type": 'multipart/form-data',
                    "Authorization": `Bearer ${access_token}`
                }
            })


            console.log(response.data)

            if (response.data.isSuccess) (
                onNext()
            )

            setLoading(false)


        } catch (error) {
            setLoading(false)
            console.error("error in catch", error)
        }
    }

    const handleClearImage1 = () => {
        setImage1([])
    }

    const handleClearImage2 = () => {
        setImage2([])
    }
    const handleClearImage3 = () => {
        setImage3([])
    }
    const handleClearImage4 = () => {
        setImage4([])
    }

    return (
        <FlexCont sx={{ flexDirection: 'column', width: '100%' }}>
            <Typography sx={{ fontFamily: 'fontRegular', fontSize: { xs: '24px', sm: '30px' }, }}>
                Add Photos to your profile
            </Typography>
            <Typography>
                Note: Your first photo upload will be set as your display picture.
            </Typography>
            {image1.length === 0 && image2.length === 0 && image3.length === 0 && image4.length === 0 ?
                <Box component='form'
                    sx={{
                        width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
                        mt: 4,
                        border: "2px dashed #989898",
                        borderSpacing: '5rem',
                        borderRadius: "10px",
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        '&:hover': {
                            cursor: 'pointer'
                        }

                    }}>

                    <div
                        style={{
                            width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '2rem'
                        }}

                        {...getImage1RootProps({ className: 'dropzone' })}
                    >
                        <input {...getImage1InputProps()} />

                        <img src={DropImage} alt='drop-image' style={{ width: "100px" }} />
                        <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Drop your images here, or <span style={{ color: "#006BFA" }}>  Browse. </span></p>
                        <em>Supports JPEG, JPG and PNG only.</em>
                    </div>


                </Box>
                :

                null

            }

            {image1.length > 0 || image2.length > 0 || image3.length > 0 || image4.length > 0 ?

                <Grid container sx={{ mt: 5, width: '100%', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={5} md={2.5} >
                        {image1.length > 0 ?
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
                                    <IconButton onClick={handleClearImage1} sx={{ backgroundColor: '#fff', mb: -5.5, mr: 0.2 }} >
                                        <CloseIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </Box>
                                <Box>
                                    {

                                        image1.map(path =>
                                            <img key={path} src={path} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: "20px" }} />
                                        )

                                    }

                                </Box>
                            </>
                            :
                            <Box sx={{
                                width: '100%',
                                aspectRatio: 1 / 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                padding: '2rem',
                                border: "2px dashed #989898",
                                borderRadius: '20px',
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                                {...getImage1RootProps({ className: 'dropzone' })}
                            >
                                <input {...getImage1InputProps()} />

                                <img src={Add} alt='drop-image' style={{ width: "100px", }} />
                            </Box>


                        }
                    </Grid>

                    <Grid item xs={5} md={2.5}>

                        {image2.length > 0 ?
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <IconButton onClick={handleClearImage2} sx={{ backgroundColor: '#fff', mb: -5.5, mr: 0.2 }} >
                                        <CloseIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </Box>
                                <Box>
                                    {image2.map(path =>
                                        <img key={path} src={path} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: '20px' }} />
                                    )}
                                </Box>
                            </>
                            :


                            <Box sx={{
                                width: '100%',
                                aspectRatio: 1 / 1,
                                borderRadius: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                padding: '2rem',
                                border: "2px dashed #989898",
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                                {...getImage2RootProps({ className: 'dropzone' })}
                            >
                                <input {...getImage2InputProps()} />

                                <img src={Add} alt='drop-image' style={{ width: "100px", }} />
                            </Box>
                        }

                    </Grid>
                    <Grid item xs={5} md={2.5} >
                        {image3.length > 0 ?

                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <IconButton onClick={handleClearImage3} sx={{ backgroundColor: '#fff', mb: -5.5, mr: 0.2 }} >
                                        <CloseIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </Box>
                                <Box>
                                    {image3.map(path =>
                                        <img key={path} src={path} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: '20px' }} />
                                    )}
                                </Box>
                            </>
                            :


                            <Box
                                sx={{
                                    border: "2px dashed #989898",
                                    width: '100%',
                                    aspectRatio: 1 / 1,
                                    borderRadius: '20px',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
                                    padding: '2rem',
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }
                                }}
                                {...getImage3RootProps({ className: 'dropzone' })}
                            >
                                <input {...getImage3InputProps()} />

                                <img src={Add} alt='drop-image' style={{ width: "100px", }} />
                            </Box>
                        }
                    </Grid>
                    <Grid item xs={5} md={2.5} >
                        {image4.length > 0 ?

                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <IconButton onClick={handleClearImage4} sx={{ backgroundColor: '#fff', mb: -5.5, mr: 0.2 }}>
                                        <CloseIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </Box>
                                <Box>
                                    {image4.map(path =>
                                        <img key={path} src={path} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: '20px' }} />
                                    )}
                                </Box>
                            </>
                            :


                            <Box sx={{
                                aspectRatio: 1 / 1,
                                border: "2px dashed #989898", borderRadius: '20px',
                                width: '100%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
                                padding: '2rem',
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                                {...getImage4RootProps({ className: 'dropzone' })}
                            >
                                <input {...getImage4InputProps()} />

                                <img src={Add} alt='drop-image' style={{ width: "100px", }} />
                            </Box>
                        }
                    </Grid>

                </Grid>
                :
                null


            }



            

            <Button variant='contained'
                sx={{ mt: '5rem', width: { xs: '90%', sm: '60%',  md: '50%', lg: '40%' }, borderRadius: '100px', backgroundColor: '#006BFA' }}
                onClick={handleNext}
            >
                {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}
                Next
            </Button>


        </FlexCont>
    )
}
