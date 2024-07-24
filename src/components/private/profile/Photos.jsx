import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllTab from './AllTab';
import PhotosTab from './PhotosTab';
import { useTheme, ThemeProvider } from '@mui/material';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width:'100%' }}
        >
            {value === index && (
                <Box sx={{}}>
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

export default function Photos({userId}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme()
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ p: 1, width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: theme.palette.secondary.tab,
                        },
                    }} >
                        <Tab label="All" {...a11yProps(0)} sx={{
                            '&.Mui-selected': {
                                color: theme.palette.secondary.main,
                                borderBottom: theme.palette.secondary.main
                            }
                        }} />
                        <Tab label="Photos" {...a11yProps(1)} sx={{
                            '&.Mui-selected': {
                                color: theme.palette.secondary.main,
                                borderBottom: theme.palette.secondary.main
                            }
                        }} />
                        <Tab label="Videos" {...a11yProps(2)} sx={{
                            '&.Mui-selected': {
                                color: theme.palette.secondary.main,
                                borderBottom: theme.palette.secondary.main
                            }
                        }} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <AllTab userId={userId} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <PhotosTab />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant='h3'>
                            Videos Tab
                        </Typography>
                    </Box>
                </CustomTabPanel>
            </Box>
        </ThemeProvider>
    );
}
