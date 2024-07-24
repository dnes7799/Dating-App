import { Box, Typography, createTheme, ThemeProvider, Button } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Heart from '../../../assets/Heart.svg'
import Heart2 from '../../../assets/Heart2.svg'
import LandingImg from '../../../assets/LandingImg.svg'
import SmallHeart from '../../../assets/SmallHeart.svg'
import MessageIcon from '../../../assets/Message.svg'
import Woman from '../../../assets/Woman.svg'
import Arc from '../../../assets/Arc.svg'
import Arc2 from '../../../assets/Arc2.svg'
import PeopleCircle from '../../../assets/PeopleCircle.svg'
import CrossHeart from '../../../assets/CrossHeart.svg'

import { useNavigate } from "react-router-dom";

// const theme = createTheme({
//     components: {
//         MuiTypography: {
//             styleOverrides: {
//                 root: {
//                     //fontFamily: 'fontRegular',
//                     textAlign: 'center'
//                 }
//             }
//         }
//     }
// })


const Landing = () => {
    const navigate = useNavigate()


    return (
        // <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: {xs:'1rem', sm:'10rem'}, width: '100%' }}>

                <Box sx={{ display: 'flex', flexDirection: 'row', mb: 3 }}>
                    <Box sx={{ mr: 6, mt: 2.5 }}>
                        <img src={Heart} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                        <Typography sx={{ fontSize: { xs: '24px', sm: '30px', md: '36px' }, textAlign: 'center', fontFamily: "fontRegular" }}>
                            Discover Your <span style={{ color: '#F0474E' }}>Love Story:  </span>
                            <br />
                            Where Common Interests Unite Hearts!
                        </Typography>

                        <Typography sx={{ mt: 2, fontSize: '14px' }} >
                            A platform that finds you people based on your interests and hobbies.
                        </Typography>

                        <Button variant="contained" onClick={() => navigate('/login')}
                            sx={{
                                display: 'flex', 
                                flexDirection: 'row', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                borderRadius: '100px', 
                                minHeight:'50px', 
                                mt: 4,
                                backgroundColor: "#006BFA",
                                textTransform:'none'
                            }}>
                            Get Started
                            <ArrowRightAltIcon sx={{ml:0.2,  color: "#fff", }} />

                        </Button>

                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'end' }}>
                        <img src={Heart2} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={SmallHeart} />
                    </Box>
                </Box>

                <Box sx={{ mb: { sm: '-4.5rem', md: '-5rem' }, ml: { sm: '2rem', md: '4rem' }, }}>
                    <img src={CrossHeart} style={{ width: '100%' }} />
                </Box>

                <Box sx={{ pt: 8, px: 2, display: { xs: 'none', sm: 'flex' }, flexDirection: 'row', justifyContent: 'center' }}>
                    <Box >
                        <img src={MessageIcon} alt="message-icon" style={{ width: "100%" }} />
                    </Box>
                    <Box sx={{ ml: -3 }}>
                        <img src={Woman} alt='woman-img' style={{ width: '100%' }} />
                    </Box>

                    <Box sx={{ mt: { sm: -3, md: -2 }, ml: { sm: -2.5, md: -4 } }}>
                        <img src={Arc} alt="arc" style={{ width: '100%' }} />
                    </Box>
                    <Box sx={{ mt: { sm: 1.2, md: 8 }, ml: -3 }}>
                        <img src={PeopleCircle} alt="people" style={{ width: '100%' }} />
                    </Box>

                </Box>
                <Box sx={{ display: { xs: 'block', sm: 'none' }, mt: { xs: '-2.5rem' }, mb: 2, width:'100%', p: 1 }}>

                    <Box>
                        <img src={Arc2} style={{width:'100%'}} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center' }}>
                        <Box>
                            <img src={Woman} style={{ width: '100%' }} />
                        </Box>
                        <Box>
                            <img src={MessageIcon} style={{ width: '100%' }} />
                        </Box>
                    </Box>

                </Box>

                <Box sx={{ backgroundColor: "#F7F7F7", width: '100%', pb: 6 }}>

                    <Typography sx={{ fontSize: { xs: '28px', sm: '30px', md: '36px' }, my: 1, textAlign: 'center', fontFamily: "fontRegular" }}>
                        About StoGrab
                    </Typography>
                    <Typography sx={{ mt: 2, fontSize: '16px', width: {xs:'90%', sm: '70%', md:'50%', lg:'40%'}, margin: 'auto', textAlign: 'center' }} >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
                    </Typography>

                </Box>

                <Box sx={{ width: '100%', backgroundColor: "#006BFA", p: 2 }}>
                    <Typography sx={{ textAlign: 'center', color: "#fff" }}>
                        All Rights Reserved
                    </Typography>

                </Box>



            </Box>
        // </ThemeProvider>
    );
}

export default Landing;