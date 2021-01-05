import React, { Fragment } from 'react';
import { Container, Grid, Box, Divider, Button } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';

// component
import SettingsNav from '../../../components/global/SettingsNav';

const TwitterPage = (props) => {
    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={2} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>TWITTER ACCOUNT</span>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{ borderRadius: 6 }}
                                    className="mr-10"
                                    fullWidth
                                    startIcon={<TwitterIcon />}
                                >
                                    @makiyoshikawa2
                                </Button>
                            </Box>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 60 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ borderRadius: 100, fontWeight: 'bold' }}
                                className="mr-20"
                            >
                                DISCONNECT
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(TwitterPage);