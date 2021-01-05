import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, Box, Divider } from '@material-ui/core';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

// component
import SettingsNav from '../../components/global/SettingsNav';

const preferencesTabLabels = [
    {
        id: 0,
        label: 'Push notifications',
        path: '/settings/notifications/webpush',
    },
    {
        id: 1,
        label: "Email notifications",
        path: '/settings/notifications/email',
    },
    {
        id: 2,
        label: "Site notifications",
        path: '/settings/notifications/site',
    },
    {
        id: 3,
        label: "Toast notifications",
        path: '/settings/notifications/toast',
    },
];

const otherTabLabels = [
    {
        id: 4,
        label: 'Telegram bot',
        path: '/settings/notifications/telegram',
    },
];

const NotificationsPage = (props) => {
    const history = useHistory();
    const [hoveredTab, setHoveredTab] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredTab(index);
    };

    const handleMouseLeave = (index) => {
        setHoveredTab(null);
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={4} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>NOTIFICATIONS</span>
                        </Box>
                        <Box style={{ height: 10, backgroundColor: '#eee', borderTop: '1px solid #ddd' }}></Box>

                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>Preferences</Box>
                        <Divider />
                        {preferencesTabLabels.map((item) => (
                            <Box key={item.id}>
                                <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                                    <Box
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={() => handleMouseLeave(item.id)}
                                        onClick={() => history.push(item.path)}
                                        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: hoveredTab === item.id ? 'rgba(0,145,234,.06)' : 'white', cursor: 'pointer' }}
                                    >
                                        <span>{item.label}</span>
                                        <KeyboardArrowRightRoundedIcon color={hoveredTab === item.id ? "primary" : "inherit"} />
                                    </Box>
                                </Box>
                                <Divider></Divider>
                            </Box>
                        ))}
                        <Box style={{ height: 10, backgroundColor: '#eee' }}></Box>

                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>Other</Box>
                        <Divider></Divider>
                        {otherTabLabels.map((item) => (
                            <Box key={item.id}>
                                <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                                    <Box
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={() => handleMouseLeave(item.id)}
                                        // onClick={() => history.push(item.path)}
                                        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: hoveredTab === item.id ? 'rgba(0,145,234,.06)' : 'white', cursor: 'pointer' }}
                                    >
                                        <span>{item.label}</span>
                                        <KeyboardArrowRightRoundedIcon color={hoveredTab === item.id ? "primary" : "inherit"} />
                                    </Box>
                                </Box>
                                <Divider></Divider>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(NotificationsPage);