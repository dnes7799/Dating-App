import React, { useEffect, useState, useContext } from 'react'
import Logo from '../../../assets/Logo.svg'
import { Box, Grid, styled, createTheme, ThemeProvider, Button, CssBaseline } from '@mui/material'
import WestIcon from '@mui/icons-material/West';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAuthContext } from '../../../context/authContext';
import { useSelector, useDispatch } from 'react-redux';

import UsernameStep from '../../../components/private/update profile/UsernameStep';
import PronounStep from '../../../components/private/update profile/PronounStep';
import BirthdayStep from '../../../components/private/update profile/BirthdayStep';
import BodyDetailsStep from '../../../components/private/update profile/BodyDetailsStep';
import PhotoStep from '../../../components/private/update profile/PhotoStep';
import AgeGroupInterest from '../../../components/private/update profile/AgeGroupInterest';
import OtherPersonInterest from '../../../components/private/update profile/OtherPersonInterest';
import SexualOrientation from '../../../components/private/update profile/SexualOrientation';

const FlexCont = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))


const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: '100%'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",

                },

                notchedOutline: {
                    border: 'none',
                    borderRadius: '2px',
                    borderBottom: '3px solid #CCC',
                }
            }
        }
    }
})

const steps = [
    { title: 'Input your username', component: UsernameStep },
    { title: 'Select your pronoun', component: PronounStep },
    { title: "When's your birthday?", component: BirthdayStep },
    { title: "Pick your details", component: BodyDetailsStep },
    { title: "Add photos to your profile", component: PhotoStep },
    { title: "Age group Interest", component: AgeGroupInterest },
    { title: "Other Person Interests", component: OtherPersonInterest },
    { title: "Sexual Orientation Interest", component: SexualOrientation }
];



export default function UpdateProfile() {

    const [completedSteps, setCompletedSteps] = useState([]);
    const [activeComp, setActiveComp] = useState(0)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const baseUrl = useSelector(state => state.global.baseUrl)
    const access_token = localStorage.getItem('access_token')
    const authValues = useContext(AuthContext)

    const showInterests = useSelector(state => state.profile.showInterests)

    useEffect(() => {

        if (!authValues.isLoggedIn) {
            navigate('/signup')
        }
    }, [])


    const handleNext = async () => {

        setActiveComp(prevComp => {
            const nextComp = prevComp + 1;
            setCompletedSteps([...completedSteps, prevComp]);
            return nextComp < steps.length ? nextComp : prevComp;
        });


    };

    const handleBack = () => {
        if (activeComp > 0) {
            setCompletedSteps(completedSteps.filter(step => step !== activeComp - 1))
            setActiveComp(prevComp => prevComp - 1);
        }

        else {
            navigate('/signup');
        }
    };

    const CurrentStepComponent = steps[activeComp].component;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <FlexCont sx={{ p: { xs: '0.5rem', sm: '2rem', md: '4rem' }, mt: '2rem' }}>
                <Grid container>
                    <Grid item xs={1} onClick={handleBack} >
                        <Button sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', borderRadius: '50%', minWidth: '50px', aspectRatio: 1 / 1 }}>
                            <WestIcon sx={{ color: '#000' }} />
                        </Button>
                        <WestIcon sx={{ display: { xs: 'flex', sm: 'none' } }} />
                    </Grid>

                    <Grid item xs={11} >
                        <FlexCont>
                            <img src={Logo} style={{ width: "50px" }} />
                        </FlexCont>

                        {!showInterests ?
                            <FlexCont sx={{ my: 5, flexDirection: 'row', gap: 0.5 }}>
                                {steps.map((step, index) => (
                                    <Box key={index} sx={{
                                        backgroundColor: completedSteps.includes(index) ? '#006BFA' : (index === activeComp ? '#006BFA' : '#D9D9D9'),
                                        height: '2px', width: '24px', borderRadius: '100px'
                                    }}></Box>
                                ))}
                            </FlexCont>
                            :
                            <>
                                <FlexCont sx={{ my: 5, flexDirection: 'row', gap: 0.5 }}>
                                    {steps.map((step, index) => (
                                        <Box key={index} sx={{
                                            borderStyle: 'solid',
                                            borderWidth: '4px',
                                            borderColor: completedSteps.includes(index) ? '#006BFA' : (index === activeComp ? '#006BFA' : '#D9D9D9'),
                                            borderRadius: '50%',
                                            width: '40px',
                                            aspectRatio: 1 / 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            {index + 1}
                                        </Box>
                                    ))}
                                </FlexCont>
                            </>
                        }

                        <CurrentStepComponent onBack={handleBack} onNext={handleNext} dispatch={dispatch} baseUrl={baseUrl} access_token={access_token} />



                    </Grid>
                </Grid>
            </FlexCont>
        </ThemeProvider>
    )
}
