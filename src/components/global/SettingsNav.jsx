import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from "react-router-dom";

// material ui
import {
    Grid,
    AppBar,
    IconButton,
    Box,
    Divider,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';

// component

const settingTabLabels = [
    {
        id: 0,
        label: 'Profile',
        path: '/settings/profile',
    },
    {
        id: 1,
        label: 'Account',
        path: '/settings/account',
    },
    {
        id: 2,
        label: 'Privacy and safety',
        path: '/settings/security',
    },
    {
        id: 3,
        label: 'Fans and following',
        path: '/settings/fans',
    },
    {
        id: 4,
        label: 'Notifications',
        path: '/settings/notifications',
    },
];

const generalTabLabels = [
    {
        id: 5,
        label: 'Display',
        path: '/settings/display',
    },
    // {
    //     id: 6,
    //     label: "What's New",
    //     path: '/settings/changelog',
    // },
];

const SettingsNavPage = (props) => {
    const history = useHistory();
    const [hoveredTab, setHoveredTab] = useState(null);

    const profile = useASelector((state) => state.auth.profile, []);

    const handleMouseEnter = (index) => {
        setHoveredTab(index);
    };

    const handleMouseLeave = (index) => {
        setHoveredTab(null);
    };

    return (
        <Fragment>
            <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                            <ArrowBackRoundedIcon />
                        </IconButton>
                        <span style={{ fontWeight: 500, fontSize: 19 }}>SETTINGS</span>
                    </Grid>
                </Grid>
            </AppBar>
            <Box style={{ height: 10, backgroundColor: '#eee', borderTop: '1px solid #ddd' }}></Box>
            <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>
                <Link to="/profile">@{profile.username}</Link>
            </Box>
            <Divider></Divider>
            {settingTabLabels.map((item) => (
                <Box key={item.id}>
                    <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                        <Box
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={() => handleMouseLeave(item.id)}
                            onClick={() => history.push(item.path)}
                            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: hoveredTab === item.id || props.index === item.id ? 'rgba(0,145,234,.06)' : 'white', cursor: 'pointer' }}
                        >
                            <span>{item.label}</span>
                            <KeyboardArrowRightRoundedIcon color={hoveredTab === item.id || props.index === item.id ? "primary" : "inherit"} />
                        </Box>
                    </Box>
                    <Divider></Divider>
                </Box>
            ))}
            <Box style={{ height: 10, backgroundColor: '#eee' }}></Box>
            <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>General</Box>
            <Divider></Divider>
            {generalTabLabels.map((item) => (
                <Box key={item.id}>
                    <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                        <Box
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={() => handleMouseLeave(item.id)}
                            onClick={() => history.push(item.path)}
                            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: hoveredTab === item.id || props.index === item.id ? 'rgba(0,145,234,.06)' : 'white', cursor: 'pointer' }}
                        >
                            <span>{item.label}</span>
                            <KeyboardArrowRightRoundedIcon color={hoveredTab === item.id || props.index === item.id ? "primary" : "inherit"} />
                        </Box>
                    </Box>
                    <Divider></Divider>
                </Box>
            ))}
        </Fragment >
    );
};

SettingsNavPage.propTypes = {
    index: PropTypes.number,
};

export default React.memo(SettingsNavPage);