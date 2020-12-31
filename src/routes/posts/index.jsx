import React, { Fragment } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, AppBar, IconButton, Button, TextField } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
// component

const NotificationsPage = (props) => {
    const history = useHistory();

    return (
        <Fragment>
            <Container maxWidth="lg">
                <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => history.back()} style={{ color: 'black' }}>
                                        <ArrowBackRoundedIcon />
                                    </IconButton>
                                    <span style={{ fontWeight: 'bold' }}>NEW POST</span>
                                </Grid>
                                <Grid item>
                                    <Button style={{ borderRadius: 100, width: 80, fontWeight: 'bold', backgroundColor: '#00aff0', color: 'white' }}>
                                        POST
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-20">
                        <TextField
                            id="outlined-multiline-static"
                            label="New Post"
                            multiline
                            variant="outlined"
                            fullWidth={true}
                            placeholder="Compose new post..."
                        />
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(NotificationsPage);