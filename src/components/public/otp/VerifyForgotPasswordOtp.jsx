import { Box, Card, Typography, createTheme, ThemeProvider, Button, CssBaseline } from "@mui/material";
import Logo from '../../../assets/Logo.svg'
import OTPInput from "react-otp-input";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import swal from "sweetalert";


const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    textAlign: 'center',
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
const VerifyForgotPasswordOtp = ({ email, userId }) => {
    const baseUrl = useSelector(state => state.global.baseUrl)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const handleOtpVerify = async () => {

        if (otp?.length == 6) {
            try {
                setLoading(true)
                const response = await axios.post(`${baseUrl}/api/v1/user/verify_forgot_password_otp`, {
                    email,
                    userId: userId,
                    otp
                })

                console.log(response)
                if (response.data.isSuccess) {
                    swal({
                        icon:'success',
                        text: "We have sent you a password in your email. Please use it to login."
                    })
                    navigate('/login')

                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                alert(error.response.data.message)
                console.error(error)
            }

        }
        else (
          
            swal({
                icon:'error',
                text:'Enter full OTP'
            })
        )

    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Card sx={{ width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, borderRadius: '20px' }}>
                    <Box>
                        <img src={Logo} style={{ width: '50px', height: 'auto' }} />
                    </Box>
                    <Typography sx={{ fontSize: '24px' }}>
                        Verify OTP
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Enter the OTP sent to your email address.
                    </Typography>

                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span> - </span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{ width: '3rem', height: '3rem', padding: '4px', fontSize: '1.5rem' }}
                        placeholder={'XXXXXX'}

                    />

                    <Button onClick={handleOtpVerify} variant="contained" sx={{ mt: 2, width: '70%', textDecoration: 'none', backgroundColor: '#006BFA', borderRadius: '6rem' }}>
                        {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}
                        Verify
                    </Button>


                </Card>

            </Box>
        </ThemeProvider>
    );
}

export default VerifyForgotPasswordOtp;