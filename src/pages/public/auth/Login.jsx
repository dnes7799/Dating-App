import { Box, Grid, Typography, createTheme, ThemeProvider, TextField, InputAdornment, Checkbox, Button, IconButton, CssBaseline } from "@mui/material"
import Logo from '../../../assets/Logo.svg'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginImage from '../../../assets/LoginWoman.png'
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import swal from "sweetalert";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import socket from "../../../socket";


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
                    borderRadius: " 30px"
                },
                input: {

                    marginLeft: '0.4rem'
                }
            }
        }
    }
})
const schema = yup.object().shape({
    email: yup.string().email().required('Please enter your email.'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password Too short. It must be 8 characters long.'),
});


const Login = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            //re_password: '',
        },
        resolver: yupResolver(schema),
    });

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loggedInChecked, setLoggedInChecked] = useState(false)



    const onLogin = async (data) => {

        const formData = {...data, keep_logged_in: loggedInChecked}

        try {
            setLoading(true)
            await login(formData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error?.response?.data?.message)
            console.error(error)
        }

    }

    useEffect(() => {

        const access_token = localStorage.getItem('access_token')

        if (access_token) { 

            // socket.auth = { token };
            // socket.connect();

            navigate('/home')
        }

    }, [])

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    console.log("loggedInChecked", loggedInChecked)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container spacing={2}>

                <Grid item xs={0} md={6} lg={5.5} sx={{ display: { xs: "none", md: 'grid' } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <img src={LoginImage} style={{ width: '100%', height: '100%' }} />
                        <Box sx={{ mt: -30 }}>

                            <Typography sx={{ fontSize: '80px', color: "#fff", fontFamily: "fontRegular" }}>
                                StoGrab
                            </Typography>
                            <Typography sx={{ fontSize: '18px', color: "#fff" }}>
                                A platform that finds you people based on your interests and hobbies.
                                Who knows? maybe your soulmate is a click away?
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={6.5} mt={2} sx={{ justifyContent: 'center' }}>
                    <Box sx={{ width: { xs: '50px', sm: '75px', md: '100px', lg: '125px' }, }}>
                        <a href="/">
                            <img src={Logo} style={{ width: '100%', height: 'auto' }} />
                        </a>
                    </Box>
                    <Box mt={8} p={2}>

                        <Typography sx={{ fontSize: "40px", fontWeight: 600, fontFamily: 'fontRegular', }}>
                            Welcome to <span style={{ color: "#006BFA" }} >StoGrab</span>
                        </Typography>
                        <Typography sx={{ fontSize: '16px' }}>
                            Fill the credentials below to log into StoGrab.
                        </Typography>

                        <Box component='form' onSubmit={handleSubmit(onLogin)} sx={{ width: { xs: '100%', sm: '80%', md: '70%', lg: '50%' }, mt: 3, mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Controller
                                name="email"
                                control={control}

                                render={({ field }) =>
                                    <>
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
                                                ),


                                            }}
                                            sx={{
                                                mb: 1
                                            }}
                                            {...field}

                                        />
                                        {errors?.email !== undefined &&
                                            <Typography color='red' textAlign='left'>
                                                {errors?.email?.message}
                                            </Typography>
                                        }

                                    </>
                                }
                            />

                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) =>
                                    <>
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
                                        {errors?.password !== undefined &&
                                            <Typography color='red'>
                                                {errors.password.message}
                                            </Typography>
                                        }

                                    </>
                                }
                            />
                            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox

                                        checked={loggedInChecked}
                                        onChange={() => setLoggedInChecked(!loggedInChecked)}

                                    />
                                    <Typography>
                                        Keep me logged in
                                    </Typography>
                                </Box>

                                <Box component={Link} to="/forgot-password" sx={{ textDecoration: 'none' }}>
                                    <Typography sx={{ color: " #C1230D" }}>
                                        Forgot your password?
                                    </Typography>
                                </Box>
                            </Box>

                            <Button type="submit" variant="contained" sx={{ p: 1.5, mt: 4, width: '100%', textTransform: 'none', backgroundColor: "#006BFA", borderRadius: '30px' }}>
                                {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}
                                Login
                            </Button>
                        </Box>

                        <Typography sx={{ mt: '5rem', fontSize: '20px' }}>
                            Don't have an account yet? <Link to="/signup" style={{ textDecoration: 'none' }} > <span style={{ color: "#006BFA", }}>  Sign Up</span> </Link>
                        </Typography>

                    </Box>

                </Grid>

            </Grid>
        </ThemeProvider>
    );
}

export default Login;