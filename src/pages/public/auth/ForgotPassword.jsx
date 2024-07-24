import { Box, Button, Card, Divider, TextField, Typography, CircularProgress, } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import axios from "axios";
import { useSelector } from "react-redux";
import VerifyForgotPasswordOtp from "../../../components/public/otp/VerifyForgotPasswordOtp";


const ForgotPassword = () => {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [showOtpVerify, setShowOtpVerify] = useState(false)
    const [userId, setUserId] = useState()


    const navigate = useNavigate()
    const baseUrl = useSelector(state => state.global.baseUrl)

    console.log("userId", userId) 


    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!email) {
            swal({
                icon:'error',
                text:"Please enter your email address."
            })
            return
        }

        try {
            setLoading(true)
            const response = await axios.post(`${baseUrl}/api/v1/user/forgot_password`, {
                email: email
            })
            console.log(response.data)
            if (response?.data?.isSuccess) {
                setUserId(response.data.responseData.userId)
                setShowOtpVerify(true)
            }
            else(
                swal({
                    icon:'error',
                    text:response.data.message
                })
            )
            setLoading(false)


        } catch (error) {
            swal({
                icon:'error',
                text: error.response.data.message
            })
            setShowOtpVerify(false)
            console.error(error)
        }

    }


    return (
        <> {!showOtpVerify ?
            <Box my={3}>

                <Card component='form' sx={{ p: 3, width: { xs: '90%', sm: "70%", md: '50%', lg: '40%' }, margin: 'auto' }}>
                    <Typography textAlign='center' mb={2} variant="h6" fontWeight='bold' >
                        Request a new password
                    </Typography>
                    <Divider />
                    <Typography my={2}>
                        Please enter your email address.
                    </Typography>
                    <TextField
                        fullWidth
                        type="email"
                        size="small"
                        required
                        placeholder="abc123@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Box sx={{ display: "flex", flexDirection: 'row', my: 2, gap: 1, justifyContent: "flex-end" }}>
                        <Button variant="contained" onClick={() => { navigate('/login') }} sx={{
                            backgroundColor: "#e1e1e1", color: '#000', '&:hover': { backgroundColor: '#e1e1e1' },
                        }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"

                            onClick={handleSubmit}
                            sx={{
                                width: '155px',
                                backgroundColor: "#006BFA", '&:hover': { backgroundColor: "#66A7FF" },
                            }}>
                            {loading ?
                                <CircularProgress size='1.5rem' color="inherit" />

                                :
                                <Typography> Send Request </Typography>
                            }
                        </Button>
                    </Box>
                </Card>


            </Box>
            :
            <VerifyForgotPasswordOtp userId={userId} email={email} />

        }
        </>
    );
}

export default ForgotPassword;