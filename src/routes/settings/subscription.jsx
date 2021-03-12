import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Container, Grid, Box, Divider, Button, TextField } from '@material-ui/core';

// component
import SettingsNav from '../../components/global/SettingsNav';

const SubscriptionPage = (props) => {

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={10} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>SUBSCRIPTION</span>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <TextField
                                    label="Price per month"
                                    variant="outlined"
                                    name="price"
                                    defaultValue="$ Free"
                                    fullWidth
                                    disabled
                                    className="mt-20"
                                />
                                <p style={{ fontSize: 12, color: 'rgba(138,150,163,.75', marginLeft: 20, marginTop: 5, marginBottom: 0 }}>You must Add a Bank <Link to="/banking">Account or Payment Information</Link> before you can set your price or accept tips.</p>
                                <span style={{ fontSize: 12, color: 'rgba(138,150,163,.75', marginLeft: 20 }}>Minimum $0 USD or free</span>
                            </Box>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 60 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ borderRadius: 100, fontWeight: 'bold' }}
                                className="mr-10"
                                disabled
                            >
                                CANCEL
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: 100, fontWeight: 'bold', color: 'white' }}
                                className="mr-10"
                                disabled
                            >
                                SAVE
                            </Button>
                        </Box>
                        <Divider />
                        <Box style={{ height: 10, backgroundColor: '#eee' }}></Box>

                        <Box style={{ height: 60, padding: 5 }}>
                            <Box
                                style={{ paddingLeft: 10, paddingRight: 10 }}
                            >
                                <p style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>Profile promotion campaign</p>
                                <p style={{ fontSize: 12, color: 'rgba(138,150,163,.75)' }}>Offer a free trial or a discounted subscription on your profile for a limited number of new or already expired subscribers.</p>
                            </Box>
                        </Box>
                        <Box style={{ height: 10, backgroundColor: '#eee' }}></Box>

                        <Box style={{ height: 60, padding: 5 }}>
                            <Box
                                style={{ paddingLeft: 10, paddingRight: 10 }}
                            >
                                <p style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>Following bundles</p>
                                <p style={{ fontSize: 12, color: 'rgba(138,150,163,.75)' }}>Offer several months of subscription as a discounted bundle.</p>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(SubscriptionPage);