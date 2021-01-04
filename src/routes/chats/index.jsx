import React, { Fragment } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, AppBar, IconButton } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
// component

const ChatsPage = (props) => {
    const history = useHistory();

    return (
        <Fragment>
            <Container maxWidth="lg">
                <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                        <ArrowBackRoundedIcon />
                                    </IconButton>
                                    <span style={{ fontWeight: 'bold' }}>MESSAGES</span>
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <SearchRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        No messages yet!
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(ChatsPage);