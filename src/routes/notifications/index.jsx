import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, AppBar, Tabs, Tab, IconButton } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import AssistantOutlinedIcon from '@material-ui/icons/AssistantOutlined';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
// component

const NotificationsPage = (props) => {
    const history = useHistory();
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Fragment>
            <Container maxWidth="lg">
                <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                    <Grid container direction="column">
                        <Grid item style={{ marginBottom: -15 }}>
                            <Grid container direction="row" justify="space-between">
                                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => history.back()} style={{ color: 'black' }}>
                                        <ArrowBackRoundedIcon />
                                    </IconButton>
                                    <span style={{ fontWeight: 'bold' }}>NOTIFICATIONS</span>
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
                                        aria-label="simple tabs example"
                                    >
                                        <Tab label={<div style={{ display: 'flex' }}><LibraryAddCheckOutlinedIcon style={{ marginRight: 10 }} />ALL</div>} style={{ fontWeight: 'bold' }} />
                                        <Tab label={<div style={{ display: 'flex' }}><AssistantOutlinedIcon style={{ marginRight: 10 }} />INTERACTIONS</div>} style={{ fontWeight: 'bold' }} />
                                        <Tab label={<div style={{ display: 'flex' }}><FavoriteBorderRoundedIcon style={{ marginRight: 10 }} />LIKED</div>} style={{ fontWeight: 'bold' }} />
                                        <Tab label={<div style={{ display: 'flex' }}><LockOpenRoundedIcon style={{ marginRight: 10 }} />SUBSCRIBED</div>} style={{ fontWeight: 'bold' }} />
                                        <Tab label={<div style={{ display: 'flex' }}><AttachMoneyRoundedIcon style={{ marginRight: 10 }} />TIPPED</div>} style={{ fontWeight: 'bold' }} />
                                        <Tab label={<div style={{ display: 'flex' }}><ReportProblemOutlinedIcon style={{ marginRight: 10 }} />PROMOTIONS</div>} style={{ fontWeight: 'bold' }} />
                                    </Tabs>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-20">
                        <p style={{ fontWeight: 'bold', color: '#888', fontSize: 15 }}>ALL</p>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <p style={{ textAlign: 'center', color: '#888', fontSize: 14 }}>No notificaitons currently!</p>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(NotificationsPage);