import React, { Fragment } from 'react';
import { Container, Grid, Box, Divider, Button, TextField } from '@material-ui/core';

// component
import SettingsNav from '../../../components/global/SettingsNav';

const EmailPage = (props) => {
    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={2} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>CHANGE EMAIL</span>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <TextField
                                    label="Current email"
                                    variant="outlined"
                                    name="email"
                                    defaultValue="makikikiki8@gmail.com"
                                    fullWidth
                                    disabled
                                    className="mt-20"
                                />
                                <p style={{ fontSize: 12, color: 'rgba(138,150,163,.75', marginLeft: 20, marginTop: 5, marginBottom: 0 }}>E-mail makikikiki8@gmail.com is verified</p>
                            </Box>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ borderRadius: 100, fontWeight: 'bold', width: '95%' }}
                                fullWidth
                            >
                                UPDATE EMAIL ADDRESS
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(EmailPage);