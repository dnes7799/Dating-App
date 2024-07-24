import { Box, Grid, Typography, createTheme, ThemeProvider, TextField, InputAdornment, IconButton, Button, CssBaseline } from "@mui/material"
import Logo from '../../../assets/Logo.svg'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginImage from '../../../assets/LoginWoman.png'
import { Link, useNavigate } from "react-router-dom";
import US from 'country-flag-icons/react/3x2/US'

import CircularProgress from '@mui/material/CircularProgress';

import axios from "axios";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VerifyOtp from "../../../components/public/otp/VerifyOtp";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {

                    textAlign: 'center'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "30px"
                },
                input: {

                    marginLeft: '0.4rem'
                },
            }
        }
    }
})

const schema = yup.object().shape({

    email: yup.string().email().required('Please enter your email.'),
    phone: yup.string().required('Please enter your mobile number.'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password Too short. It must be 8 characters long.'),
});


const Signup = () => {

    const [loading, setLoading] = useState(false);
    const [showVerify, setShowVerify] = useState(false)
    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState()
    const [showPassword, setShowPassword] = useState(false)


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            phone: '',
            password: '',
            //re_password: '',
        },
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();
    const baseUrl = useSelector(state => state.global.baseUrl)

    const onSignup = async (data) => {

        try {
            setLoading(true);

            const response = await axios.post(`${baseUrl}/api/v1/user/register`, {
                ...data
            })

            if (response.data.isSuccess) {
                setEmail(response.data.responseData.email)
                setUserId(response.data.responseData.userId)
                setShowVerify(true)
            }
            else(
                swal({
                    icon: 'error',
                    text: response.data.message
                })
            )

            setLoading(false);

            reset();
        } catch (error) {
            setLoading(false);
            alert(error.response.data.message)
            console.error('error', error)
            // swal('Error', error?.response?.data?.error, 'error');
        }
    };
    useEffect(() => {

        const access_token = localStorage.getItem('access_token')
        if (access_token) {
            navigate('/home')
        }

    }, [])

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {showVerify ?

                <VerifyOtp userId={userId} email={email} />

                :
                <Grid container spacing={2}>

                    <Grid item xs={0} md={6} lg={5.5}  sx={{ display: { xs: "none", md: 'grid' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                            <img src={LoginImage} style={{ width: '100%', height: '100%' }} />
                            <Box sx={{ mt: -30 }}>

                                <Typography sx={{ fontSize: '80px', color: "#fff", fontFamily:'fontRegular' }}>
                                    StoGrab
                                </Typography>
                                <Typography sx={{ fontSize: '18px', color: "#fff" }}>
                                    A platform that finds you people based on your interests and hobbies.
                                    Who knows? maybe your soulmate is a click away?
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6.5} mt={2}>
                        <Box sx={{ width: { xs: '50px', sm: '75px', md: '100px', lg: '125px' }, }}>
                            <a href="/">
                                <img src={Logo} style={{ width: '100%', height: 'auto' }} />
                            </a>
                        </Box>
                        <Box mt={8} p={2}>

                            <Typography sx={{ fontSize: "40px", fontWeight: 600, fontFamily: 'fontRegular', }}>
                                Signup to <span style={{ color: "#006BFA" }} >StoGrab</span>
                            </Typography>
                            <Typography sx={{ fontSize: '16px' }}>
                                Find the love of your life. Get started with StoGrab.
                            </Typography>

                            <Box component='form' onSubmit={handleSubmit(onSignup)}
                                sx={{ width: { xs: '100%', sm: '80%', md: '70%', lg: '50%' }, mt: 3, mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) =>

                                        <TextField
                                            fullWidth
                                            required
                                            type="tel"
                                            placeholder="Phone Number"
                                            {...field}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <US title="United States" className="..." style={{ width: '1.2em', height: 'auto' }} />

                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{

                                                mt: 3,
                                                mb: 1
                                            }}

                                        />
                                    }
                                />
                                <Controller
                                    name="email"
                                    control={control}

                                    render={({ field }) =>

                                        <TextField
                                            fullWidth
                                            required
                                            type="email"
                                            placeholder="Email"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon sx={{ color: "#CCCCCC" }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                mb: 1
                                            }}
                                            {...field}

                                        />
                                    }
                                />

                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) =>


                                        <TextField
                                            fullWidth
                                            required
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"

                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon sx={{ color: "#CCCCCC" }} />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton onClick={handleShowPassword}>
                                                            {showPassword ? <VisibilityOffIcon sx={{ color: "#CCC" }} /> :
                                                                <VisibilityIcon sx={{ color: "#CCC" }} />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                mb: 1
                                            }}
                                            {...field}

                                        />
                                    }
                                />


                                <Button type="submit" variant="contained" sx={{ p: 1.5, mt: 4, width: '100%', textTransform: 'none', backgroundColor: "#006BFA", borderRadius: '30px' }}>
                                    {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}
                                    Sign Up
                                </Button>
                            </Box>

                            <Typography sx={{ mt: '5rem', fontSize: '20px', color: "#000" }}>
                                Already have an account? <Link to="/login" style={{ textDecoration: 'none' }} > <span style={{ color: "#006BFA", }}>Login</span> </Link>
                            </Typography>

                        </Box>

                    </Grid>

                </Grid>
            }
        </ThemeProvider >
    );
}

export default Signup;