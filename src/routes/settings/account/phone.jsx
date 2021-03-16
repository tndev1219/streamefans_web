import React, { Fragment, useState } from 'react';
import { Container, Grid, Box, Divider, Button, CircularProgress } from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import validator from 'validator';

import { useASelector } from '../../../utilities/recipies.util';
import { useGlobalAction } from '../../../store/slices/global.slice';
import { useAuthAction } from '../../../store/slices/auth.slice';

// component
import SettingsNav from '../../../components/global/SettingsNav';
import AlertDialog from '../../../components/global/AlertDialog';

const PhonePage = (props) => {
    const loading = useASelector((state) => state.global.loading, []);
    const profile = useASelector((state) => state.auth.profile, []);

    const [phonenumber, setPhoneNumber] = useState(profile.phone_number ? profile.phone_number : '');
    const [error, setError] = useState(false);

    const setLoading = useGlobalAction('setLoading');
    const updateProfile = useAuthAction('updateProfile');

    const cancelBtnClick = () => {
        setPhoneNumber(profile.phone_number ? profile.phone_number : '');
    };

    const saveBtnClick = () => {
        if (!validator.isMobilePhone(phonenumber)) {
            setError(true);
        } else {
            setError(false);
            setLoading(true);

            const data = {
                id: profile.id,
                phone_number: phonenumber,
            };

            updateProfile({ data });
        }
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
                            <span style={{ fontWeight: 500, fontSize: 19 }}>PHONE NUMBER</span>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <MuiPhoneNumber
                                    label="Phone number"
                                    variant="outlined"
                                    defaultCountry={'jp'}
                                    name="phonenumber"
                                    error={error}
                                    value={phonenumber}
                                    fullWidth
                                    className="mt-20"
                                    margin="normal"
                                    helperText={error ? "Phone Number is not valid." : ""}
                                    onChange={(value) => setPhoneNumber(value)}
                                />
                            </Box>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 60 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ borderRadius: 100, fontWeight: 'bold', marginRight: '2.5%' }}
                                onClick={cancelBtnClick}
                            >
                                CANCEL
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: 100, fontWeight: 'bold', color: 'white', marginRight: '2.5%' }}
                                disabled={loading}
                                onClick={saveBtnClick}
                                endIcon={loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <></>}
                            >
                                SAVE
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <AlertDialog />
        </Fragment >
    );
};

export default React.memo(PhonePage);