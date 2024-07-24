import { Box, Card, Typography, createTheme, ThemeProvider, Button } from "@mui/material";
import Logo from '../../../assets/Logo.svg'
import OTPInput from "react-otp-input";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';


const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'fontRegular',
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
                    fontFamily: 'fontRegular',
                    marginLeft: '0.4rem'
                }
            }
        }
    }
})
const VerifyOtp = ({ email, userId }) => {
    const baseUrl = useSelector(state => state.global.baseUrl)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const handleOtpVerify = async () => {

        if (otp?.length == 6) {
            try {
                setLoading(true)
                const response = await axios.post(`${baseUrl}/api/v1/auth/verify_otp`, {
                    email,
                    userId,
                    otp
                })

                if (response.data.isSuccess) {
                    localStorage.setItem('access_token', response.data.responseData.access_token)
                    navigate('/update-profile')

                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                alert(error.response.data.message)
                console.error(error)
            }

        }
        else (
            alert("Enter full OTP")
        )

    }

    return (
        <ThemeProvider theme={theme}>
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
                        inputStyle={{width: '3rem', height: '3rem', padding: '4px', fontSize: '1.5rem'}}
                    //    placeholder={'XXXXXX'}

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

export default VerifyOtp;