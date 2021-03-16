import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, Box, Divider, Button, TextField, CircularProgress } from '@material-ui/core';

import { useASelector } from '../../../utilities/recipies.util';
import { useGlobalAction } from '../../../store/slices/global.slice';
import { useAuthAction } from '../../../store/slices/auth.slice';

// component
import SettingsNav from '../../../components/global/SettingsNav';
import SnackBar from '../../../components/global/SnackBar';

const PasswordPage = (props) => {
    const history = useHistory();
    const [fields, setFiedls] = useState({});
    const [errors, setErros] = useState({});

    const profile = useASelector((state) => state.auth.profile, []);
    const loading = useASelector((state) => state.global.loading, []);

    const setLoading = useGlobalAction('setLoading');
    const resetPassword = useAuthAction('resetPassword');

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const passwordLengthRegex = /^.{6,}$/;

    const handleChange = (e) => {
        fields[e.target.name] = e.target.value;
        setFiedls(fields);
    };

    const handleValidation = () => {
        const errors = {};
        let formIsValid = true;

        // Current Password
        if (!profile.password_reset_state && (!fields.current_password || fields.current_password.length === 0)) {
            formIsValid = false;
            errors.current_password = true;
            errors.currentPasswordHelperText = "The current password field is required";
        }

        // New Password
        if (!fields.password || fields.password.length === 0) {
            formIsValid = false;
            errors.password = true;
            errors.passwordHelperText = "The new password field is required";
        } else if (!passwordLengthRegex.test(String(fields.password))) {
            formIsValid = false;
            errors.password = true;
            errors.passwordHelperText = "The new password field must be at least 6 characters";
        } else if (!passwordRegex.test(String(fields.password))) {
            formIsValid = false;
            errors.password = true;
            errors.passwordHelperText = "The new password must contain at least 1 number, at least 1 lower case letter, and at least 1 upper case letter";
        }

        // Repeat Password
        if (!fields.repeat_password || fields.repeat_password.length === 0) {
            formIsValid = false;
            errors.repeat_password = true;
            errors.repeatPasswordHelperText = "The confirm new password field is required";
        } else {
            if (fields.password) {
                if (fields.repeat_password !== fields.password) {
                    formIsValid = false;
                    errors.repeat_password = true;
                    errors.repeatPasswordHelperText = "The confirm new password confirmation does not match";
                }
            } else {
                formIsValid = false;
                errors.repeat_password = true;
                errors.repeatPasswordHelperText = "The confirm new password confirmation does not match";
            }
        }

        setErros(errors);
        return formIsValid;
    };

    const handleClick = () => {
        if (handleValidation()) {
            setLoading(true);
            handleSubmit();
            return true;
        }
    };

    const handleSubmit = () => {
        const data = fields;

        const meta = {
            redirect: history.push,
            path: '/settings/account',
        };

        if (profile.password_reset_state) {
            data.current_password = null;
        }
        resetPassword({ data, meta });
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={1} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>CHANGE PASSWORD</span>
                        </Box>
                        <Divider />

                        {!profile.password_reset_state &&
                            <>
                                <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                                    <Box style={{ width: '95%' }}>
                                        <TextField
                                            label="Current password"
                                            variant="outlined"
                                            name="current_password"
                                            type="password"
                                            fullWidth
                                            className="mt-20"
                                            required={true}
                                            onChange={handleChange}
                                            error={errors.current_password}
                                            helperText={errors.currentPasswordHelperText}
                                        />
                                    </Box>
                                </Box>
                                <Divider />
                                <Box style={{ height: 10, backgroundColor: '#eee' }}></Box>
                            </>
                        }

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <TextField
                                    label="New password"
                                    variant="outlined"
                                    name="password"
                                    type="password"
                                    fullWidth
                                    className="mt-20"
                                    required={true}
                                    onChange={handleChange}
                                    error={errors.password}
                                    helperText={errors.passwordHelperText}
                                />
                                <TextField
                                    label="Confirm new password"
                                    variant="outlined"
                                    name="repeat_password"
                                    type="password"
                                    fullWidth
                                    className="mt-20"
                                    required={true}
                                    onChange={handleChange}
                                    error={errors.repeat_password}
                                    helperText={errors.repeatPasswordHelperText}
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
                                disabled={loading}
                                onClick={handleClick}
                                endIcon={loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <></>}
                            >
                                SAVE
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <SnackBar />
            </Container>
        </Fragment >
    );
};

export default React.memo(PasswordPage);