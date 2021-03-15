import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, Box, Divider, Button, TextField, CircularProgress } from '@material-ui/core';

import { useASelector } from '../../../utilities/recipies.util';
import { useAuthAction } from '../../../store/slices/auth.slice';
import { useGlobalAction } from '../../../store/slices/global.slice';

// component
import SettingsNav from '../../../components/global/SettingsNav';
import AlertDialog from '../../../components/global/AlertDialog';

const EmailPage = (props) => {
    // Email Validation Regex
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const history = useHistory();
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateEmailValid, setUpdateEmailValid] = useState(false);
    const [updateEmailCode, setUpdateEmailCode] = useState('');
    const [updateEmailCodeValid, setUpdateEmailCodeValid] = useState(false);

    const profile = useASelector((state) => state.auth.profile, []);
    const loading = useASelector((state) => state.global.loading, []);
    const emailUpdateStep = useASelector((state) => state.auth.emailUpdateStep, []);

    const setLoading = useGlobalAction('setLoading');
    const setAlertDialog = useGlobalAction('setAlertDialog');

    const sendVerifyEmail = useAuthAction('sendVerifyEmail');
    const setEmailUpdateStep = useAuthAction('setEmailUpdateStep');
    const resetEmailRequest = useAuthAction('resetEmailRequest');
    const resetEmail = useAuthAction('resetEmail');

    const verifyBtnClick = () => {
        sendVerifyEmail({ data: { user_id: profile.id } });
        setAlertDialog({ alertDialogState: true, alertDialogMessage: 'Please check your inbox for the confirmation email' });
    };

    const updateEmailValidation = (email) => {
        return emailRegex.test(String(email).toLowerCase());
    };

    const updateEmailChange = (e) => {
        setUpdateEmail(e.target.value);

        setUpdateEmailValid(updateEmailValidation(e.target.value));
    };

    const updateBtnClick = () => {
        const data = {
            email: updateEmail,
        };

        setLoading(true);
        resetEmailRequest({ data });
    };

    const updateEmailCodeChange = (e) => {
        setUpdateEmailCode(e.target.value);

        if (e.target.value.length === 0) {
            setUpdateEmailCodeValid(false);
        } else {
            setUpdateEmailCodeValid(true);
        }
    };

    const saveBtnClick = () => {
        const data = {
            reset_email_key: updateEmailCode,
        };
        const meta = {
            redirect: history.push,
            path: '/settings/account',
        };

        setLoading(true);
        resetEmail({ data, meta });
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

                        {emailUpdateStep === 0 &&
                            <>
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
                                            helperText={profile.is_active ? `E-mail ${profile.email} is verified` : `E-mail ${profile.email} is not verified`}
                                        />
                                    </Box>
                                </Box>
                                <Divider />

                                <Box style={{ display: 'flex', justifyContent: profile.is_active ? 'center' : 'flex-end', alignItems: 'center', height: 60 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ borderRadius: 100, fontWeight: 'bold', width: profile.is_active ? '95%' : 220, marginRight: profile.is_active ? 0 : '2.5%' }}
                                        fullWidth={profile.is_active}
                                        onClick={() => setEmailUpdateStep(1)}
                                    >
                                        UPDATE EMAIL ADDRESS
                                    </Button>
                                    {!profile.is_active &&
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ borderRadius: 100, fontWeight: 'bold', width: 200, color: 'white', marginRight: '2.5%' }}
                                            onClick={verifyBtnClick}
                                        >
                                            SEND CONFIRMATION
                                        </Button>
                                    }
                                </Box>
                            </>
                        }
                        {emailUpdateStep === 1 &&
                            <>
                                <Grid container direction="column" justify="center" alignItems="flex-start" className="mt-20" style={{ marginLeft: '2.5%' }}>
                                    <p style={{ fontWeight: 'bold', color: '#aaa', fontSize: 16 }}>Step 1/2</p>
                                    <p>Please enter your new E-mail address.</p>
                                </Grid>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Box className="mb-15" style={{ width: '95%' }}>
                                        <TextField
                                            label="E-mail"
                                            variant="outlined"
                                            name="email"
                                            fullWidth
                                            error={!updateEmailValid}
                                            helperText={!updateEmailValid ? "E-mail is not valid" : ""}
                                            onChange={updateEmailChange}
                                        />
                                    </Box>
                                </Grid>
                                <Divider />

                                <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 60 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ borderRadius: 100, fontWeight: 'bold', width: 100, marginRight: '2.5%' }}
                                        onClick={() => setEmailUpdateStep(0)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: 100, fontWeight: 'bold', width: 100, color: 'white', marginRight: '2.5%' }}
                                        disabled={!updateEmailValid || loading}
                                        onClick={updateBtnClick}
                                        endIcon={loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <></>}
                                    >
                                        Next
                                    </Button>
                                </Box>
                            </>
                        }
                        {emailUpdateStep === 2 &&
                            <>
                                <Grid container direction="column" justify="center" alignItems="flex-start" className="mt-20" style={{ marginLeft: '2.5%' }}>
                                    <p style={{ fontWeight: 'bold', color: '#aaa', fontSize: 16 }}>Step 2/2</p>
                                    <p>We have sent a temporary verification code to your new E-mail address.</p>
                                    <p>Please input the code into the below form.</p>
                                </Grid>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Box className="mb-15" style={{ width: '95%' }}>
                                        <TextField
                                            label="Code"
                                            variant="outlined"
                                            name="reset_email_key"
                                            fullWidth
                                            error={!updateEmailCodeValid}
                                            helperText={!updateEmailCodeValid ? "This field is required." : ""}
                                            onChange={updateEmailCodeChange}
                                        />
                                    </Box>
                                </Grid>
                                <Divider />

                                <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 60 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ borderRadius: 100, fontWeight: 'bold', width: 100, marginRight: '2.5%' }}
                                        onClick={() => setEmailUpdateStep(0)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: 100, fontWeight: 'bold', width: 100, color: 'white', marginRight: '2.5%' }}
                                        disabled={!updateEmailCodeValid || loading}
                                        onClick={saveBtnClick}
                                        endIcon={loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <></>}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </>
                        }
                    </Grid>
                </Grid>
            </Container>
            <AlertDialog />
        </Fragment >
    );
};

export default React.memo(EmailPage);