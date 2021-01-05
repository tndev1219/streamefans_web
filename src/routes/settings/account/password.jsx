import React, { Fragment } from 'react';
import { Container, Grid, Box, Divider, Button, TextField } from '@material-ui/core';

// component
import SettingsNav from '../../../components/global/SettingsNav';

const PasswordPage = (props) => {
    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={2} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>CHANGE PASSWORD</span>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <TextField
                                    label="Current password"
                                    variant="outlined"
                                    name="cpassword"
                                    fullWidth
                                    className="mt-20"
                                />
                            </Box>
                        </Box>
                        <Divider />
                        <Box style={{ height: 10, backgroundColor: '#eee' }}></Box>

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <TextField
                                    label="New password"
                                    variant="outlined"
                                    name="npassword"
                                    fullWidth
                                    className="mt-20"
                                />

                                <TextField
                                    label="Confirm new password"
                                    variant="outlined"
                                    name="npassword"
                                    fullWidth
                                    className="mt-20"
                                />
                            </Box>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 60 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: 100, fontWeight: 'bold', color: 'white' }}
                                className="mr-20"
                            >
                                SAVE
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(PasswordPage);