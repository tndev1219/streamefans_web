import React, { Fragment } from 'react';

// material ui
import {
    Container,
    Grid,
    Box,
    Divider,
    Button,
} from '@material-ui/core';

// component
import SettingsNav from '../../../components/global/SettingsNav';
import GoogleImg from '../../../assets/images/google.jpg';

const GooglePage = (props) => {
    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={1} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>GOOGLE ACCOUNT</span>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<img src={GoogleImg} alt="google" style={{ width: 17, borderRadius: 50, marginRight: 20 }} />}
                                    fullWidth={true}
                                    style={{ borderRadius: 50, fontSize: 15, fontWeight: 'bold', backgroundColor: '#4285f4', color: 'white' }}
                                    className="p-10 pl-20 pr-20"
                                >
                                    Sign In With Google
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(GooglePage);