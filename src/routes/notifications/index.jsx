import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    AppBar,
    Tabs,
    Tab,
    IconButton,
    Hidden,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import AssistantOutlinedIcon from '@material-ui/icons/AssistantOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
// import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';

// component

const NotificationsPage = (props) => {
    const history = useHistory();
    const [tabIndex, setTabIndex] = useState(0);

    const language = useASelector((state) => state.global.language, []);

    const tabList = [
        {
            label: language ? 'すべて' : 'ALL',
            icon: <LibraryAddCheckOutlinedIcon />,
        },
        {
            label: language ? 'コメント' : 'INTERACTIONS',
            icon: <AssistantOutlinedIcon />,
        },
        {
            label: language ? 'いいねされた' : 'LIKED',
            icon: <FavoriteBorderRoundedIcon />,
        },
        {
            label: language ? '購読済み' : 'SUBSCRIBED',
            icon: <LockOpenRoundedIcon />,
        },
        {
            label: language ? '獲得されたチップ' : 'TIPPED',
            icon: <AttachMoneyRoundedIcon />,
        },
        // {
        //     label: 'PROMOTIONS',
        //     icon: <ReportProblemOutlinedIcon />,
        // },
    ];

    return (
        <Fragment>
            <Container maxWidth="lg">
                <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                    <Grid container direction="column">
                        <Grid item style={{ marginBottom: -15 }}>
                            <Grid container direction="row" justify="space-between">
                                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                        <ArrowBackRoundedIcon />
                                    </IconButton>
                                    <span style={{ fontWeight: 500, fontSize: 19 }}>{language ? '通知' : 'NOTIFICATIONS'}</span>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => history.push('/settings')} style={{ color: 'black' }}>
                                        <SettingsOutlinedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="space-between">
                                <Grid item>
                                    <Tabs
                                        value={tabIndex}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        onChange={(e, index) => setTabIndex(index)}
                                    >
                                        {tabList.map((item, key) => (
                                            <Tab
                                                key={key}
                                                label={
                                                    <div style={{ display: 'flex' }}>
                                                        {item.icon}
                                                        <Hidden xsDown>
                                                            <div style={{ marginLeft: 10 }}>{item.label}</div>
                                                        </Hidden>
                                                    </div>
                                                }
                                                style={{ fontWeight: 500 }}
                                            />
                                        ))}
                                    </Tabs>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-20">
                        <p style={{ fontWeight: 500, color: '#8a96a3', fontSize: 19 }}>{tabList[tabIndex].label}</p>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <p style={{ textAlign: 'center', color: '#8a96a3', fontSize: 14 }}>{language ? '現在、通知はありません。' : 'No notificaitons currently!'}</p>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(NotificationsPage);