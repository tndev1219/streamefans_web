import React, { Fragment, useState } from 'react';
import { Container, Grid, Box, Divider, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import { useASelector } from '../../../utilities/recipies.util';
import { useAuthAction } from '../../../store/slices/auth.slice';

// component
import SettingsNav from '../../../components/global/SettingsNav';

const EmailPage = (props) => {
    const [showModal, setShowModal] = useState(false);

    const profile = useASelector((state) => state.auth.profile, []);
    const sendVerifyEmail = useAuthAction('sendVerifyEmail');

    const handleClick = () => {
        sendVerifyEmail({ data: { user_id: profile.id } });
        setShowModal(true);
    };

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
                                    defaultValue={profile.email}
                                    fullWidth
                                    disabled
                                    error={!profile.is_active}
                                    className="mt-20"
                                />
                                <p style={{ fontSize: 12, color: profile.is_active ? 'rgba(138,150,163,.75' : '#ff6060', marginLeft: 20, marginTop: 5, marginBottom: 0 }}>
                                    {profile.is_active ?
                                        `E-mail ${profile.email} is verified`
                                        :
                                        `E-mail ${profile.email} is not verified`
                                    }
                                </p>
                            </Box>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: profile.is_active ? 'center' : 'flex-end', alignItems: 'center', height: 60 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ borderRadius: 100, fontWeight: 'bold', width: profile.is_active ? '95%' : 220, marginRight: profile.is_active ? 0 : '2.5%' }}
                                fullWidth={profile.is_active}
                            >
                                UPDATE EMAIL ADDRESS
                            </Button>
                            {!profile.is_active &&
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: 100, fontWeight: 'bold', width: 200, color: 'white', marginRight: '2.5%' }}
                                    onClick={handleClick}
                                >
                                    SEND CONFIRMATION
                                </Button>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>
                    {"Message"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please check your inbox for the confirmation email
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setShowModal(false)}
                        color="primary"
                        style={{ borderRadius: 50, fontWeight: 'bold' }}
                    >
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
};

export default React.memo(EmailPage);