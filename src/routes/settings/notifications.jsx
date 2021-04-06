import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    Box,
    Divider,
    TextField,
    Button,
    IconButton,
    Hidden,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';
import { useAuthAction } from '../../store/slices/auth.slice';

// component
import SettingsNav from '../../components/global/SettingsNav';

const NotificationsPage = (props) => {
    const history = useHistory();
    const [hoveredTab, setHoveredTab] = useState(null);

    const language = useASelector((state) => state.global.language, []);
    const profile = useASelector((state) => state.auth.profile, []);

    const preferencesTabLabels = [
        {
            id: 0,
            label: language ? 'Push通知' : 'Push notifications',
            path: '/settings/notifications/webpush',
        },
        {
            id: 1,
            label: language ? 'メール通知' : 'Email notifications',
            path: '/settings/notifications/email',
        },
        // {
        //     id: 2,
        //     label: "Site notifications",
        //     path: '/settings/notifications/site',
        // },
        // {
        //     id: 3,
        //     label: "Toast notifications",
        //     path: '/settings/notifications/toast',
        // },
    ];
    
    // const otherTabLabels = [
    //     {
    //         id: 4,
    //         label: 'Telegram bot',
    //         path: '/settings/notifications/telegram',
    //     },
    // ];

    const setAlertDialog = useGlobalAction('setAlertDialog');
    const sendVerifyEmail = useAuthAction('sendVerifyEmail');

    const handleMouseEnter = (index) => {
        setHoveredTab(index);
    };

    const handleMouseLeave = (index) => {
        setHoveredTab(null);
    };

    const handleClick = () => {
        sendVerifyEmail({ data: { user_id: profile.id } });
        setAlertDialog({ alertDialogState: true, alertDialogMessage: 'Please check your inbox for the confirmation email' });
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row" justify="center">
                    <Hidden smDown>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', minHeight: '100vh' }}>
                            <SettingsNav index={4} />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={10} md={8} lg={8} xl={8} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <Hidden mdUp>
                                <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                    <ArrowBackRoundedIcon />
                                </IconButton>
                            </Hidden>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>{language ? '通知の設定' : 'NOTIFICATIONS'}</span>
                        </Box>

                        {profile.email_verified ?
                            <>
                                <Box style={{ height: 10, backgroundColor: '#eee', borderTop: '1px solid #ddd' }}></Box>

                                <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>{language ? '環境設定' : 'Preferences'}</Box>
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
                                {/* <Box style={{ height: 10, backgroundColor: '#eee' }}></Box>

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
                                ))} */}
                            </>
                            :
                            <>
                                <Divider />

                                <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                                    <Box style={{ width: '95%' }}>
                                        <TextField
                                            label="Current email"
                                            variant="outlined"
                                            name="email"
                                            defaultValue={profile.email}
                                            fullWidth
                                            disabled
                                            error={true}
                                            className="mt-20"
                                        />
                                        <p style={{ fontSize: 12, color: '#ff6060', marginLeft: 20, marginTop: 5, marginBottom: 0 }}>
                                            E-mail {profile.email} is not verified
                                        </p>
                                    </Box>
                                </Box>
                                <Divider />

                                <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 60 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: 100, fontWeight: 'bold', width: 200, color: 'white', marginRight: '2.5%' }}
                                        onClick={handleClick}
                                    >
                                        SEND CONFIRMATION
                                    </Button>
                                </Box>
                            </>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(NotificationsPage);