import React, { Fragment } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    Box,
    Divider,
    Switch,
    IconButton,
    Hidden,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

// component
import SettingsNav from '../../../components/global/SettingsNav';

const EmailPage = (props) => {
    const history = useHistory();

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
                            <span style={{ fontWeight: 500, fontSize: 19 }}>EMAIL NOTIFICATIONS</span>
                        </Box>
                        <Divider />

                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                            <Box
                                style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}
                            >
                                <span>Email notifications</span>
                                <Switch
                                    // checked={check}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    color="primary"
                                />
                            </Box>
                        </Box>
                        <Box
                            style={{ width: '100%', display: 'flex', alignItems: 'center', paddingLeft: 15, paddingRight: 10, marginBottom: 20, marginTop: -10 }}
                        >
                            <span style={{ fontSize: 12, color: 'rgba(138,150,163,.75)' }}>Get emails to find out what’s going on when you’re not on OnlyFans. You can turn them off anytime.</span>
                        </Box>
                        <Divider></Divider>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(EmailPage);