import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, Button, Box, Divider, IconButton, TextField } from '@material-ui/core';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import AvatarImg from '../../assets/avatar/Barrera.jpg';

// component
import SettingsNav from '../../components/global/SettingsNav';

const subscriptionTabLabels = [
    {
        id: 0,
        label: 'Subscription price and bundles',
        path: '/settings/subscription',
    },
    {
        id: 1,
        label: "Fans and following",
        path: '/settings/fans',
    },
];

const securityTabLabels = [
    {
        id: 2,
        label: 'Privacy and safety',
        path: '/settings/security',
    },
];

const ProfilePage = (props) => {
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
                        <SettingsNav index={0} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>EDIT PROFILE</span>
                            <Button
                                style={{ borderRadius: 100, width: 80, backgroundColor: '#00aff0', color: 'white', fontWeight: 'bold' }}
                            >
                                SAVE
                            </Button>
                        </Box>
                        <Divider />
                        <Box
                            style={{
                                backgroundImage: `url("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg")`,
                                backgroundSize: 'cover',
                                width: '100%',
                                height: 220,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <IconButton>
                                <CameraAltOutlinedIcon style={{ color: 'white' }} />
                            </IconButton>
                            <IconButton>
                                <CloseRoundedIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                        <Box
                            style={{
                                backgroundImage: `url(${AvatarImg})`,
                                backgroundSize: 'cover',
                                width: 100,
                                height: 100,
                                border: '2px solid white',
                                borderRadius: 100,
                                marginTop: -50,
                                marginLeft: 20,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <IconButton>
                                <CameraAltOutlinedIcon style={{ color: 'white' }} />
                            </IconButton>
                            <IconButton>
                                <CloseRoundedIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '95%' }}>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    name="name"
                                    defaultValue="@makiyoshikawa"
                                    fullWidth
                                    className="mt-20"
                                />
                                <span style={{ fontSize: 12, color: 'rgba(138,150,163,.75', marginLeft: 20 }}>https://streamefans.com/makiyoshikawa</span>
                                <TextField
                                    label="Display name"
                                    variant="outlined"
                                    name="name"
                                    defaultValue="makiyoshikawa"
                                    fullWidth
                                    className="mt-20"
                                />
                                <TextField
                                    label="Bio"
                                    variant="outlined"
                                    name="bio"
                                    defaultValue="I cannot change yesterday, but I can change today."
                                    fullWidth
                                    multiline
                                    rows={2}
                                    className="mt-20"
                                />
                                <TextField
                                    label="Location"
                                    variant="outlined"
                                    name="location"
                                    fullWidth
                                    className="mt-20"
                                />
                                <TextField
                                    label="Website URL"
                                    variant="outlined"
                                    name="url"
                                    fullWidth
                                    className="mt-20"
                                />
                                <TextField
                                    label="Amazon Wishlist"
                                    variant="outlined"
                                    name="amazon"
                                    fullWidth
                                    className="mt-20"
                                />
                            </Box>
                        </Box>
                        <Box style={{ height: 10, backgroundColor: '#eee', marginTop: 20, borderTop: '1px solid #ddd' }}></Box>
                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>Subscription</Box>
                        <Divider />
                        {subscriptionTabLabels.map((item) => (
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
                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>Related settings</Box>
                        <Divider></Divider>
                        {securityTabLabels.map((item) => (
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
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(ProfilePage);