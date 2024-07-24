import React from 'react'
import PropTypes from 'prop-types';
import { Box, Modal, Typography, useTheme, ThemeProvider, Tabs, Tab } from '@mui/material'

import LikedUserModal from './LikedUserModal';
import FavoritedUserModal from './FavoritedUserModal';
import IgnoredUserModal from './IgnoredUserModal';
import ViewedUserModal from './ViewedUserModal';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default function UserActionModal({ userActionModalOpen, setUserActionModalOpen }) {

    const [currentComp, setCurrentComp] = React.useState(0);

    const handleChange = (event, newValue) => {
        setCurrentComp(newValue);
    };
    const handleClose = () => {
        setUserActionModalOpen(false)
        setCurrentComp(0)

    };

    const theme = useTheme()



    return (
        <ThemeProvider theme={theme}>

            <Modal
                open={userActionModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{

                    transform: 'auto',
                    mt: {xs:'15%', sm:'5%'},
                    width: { xs: '95%', sm: '70%', md: '50%', lg: '40%' },
                    height: '80%',
                    overflowY: 'scroll',
                    mx: 'auto',
                    bgcolor: theme.palette.background.settingList,
                    p: 2,
                    borderRadius: '8px'
                }}>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={currentComp} onChange={handleChange} aria-label="basic tabs example" >
                            <Tab label="Viewed" {...a11yProps(0)} sx={{ textTransform: 'none', p: 0, fontSize: '1rem', }} />
                            <Tab label="Liked" {...a11yProps(1)} sx={{ textTransform: 'none', p: 0, fontSize: '1rem' }} />
                            <Tab label="Favorited" {...a11yProps(2)} sx={{ textTransform: 'none', p: 0, fontSize: '1rem' }} />
                            <Tab label="Ignored" {...a11yProps(3)} sx={{ textTransform: 'none', p: 0, fontSize: '1rem' }} />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={currentComp} index={0}>
                        <ViewedUserModal />
                    </CustomTabPanel>
                    <CustomTabPanel value={currentComp} index={1}>
                        <LikedUserModal />
                    </CustomTabPanel>
                    <CustomTabPanel value={currentComp} index={2}>
                        <FavoritedUserModal />
                    </CustomTabPanel>
                    <CustomTabPanel value={currentComp} index={3}>
                        <IgnoredUserModal />
                    </CustomTabPanel>


                </Box>
            </Modal>
        </ThemeProvider>
    )
}
