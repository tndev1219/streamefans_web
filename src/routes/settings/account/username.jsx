import React, { Fragment, useState } from 'react';
import { Container, Grid, Box, Divider, Button, TextField, InputAdornment, CircularProgress } from '@material-ui/core';

import { useASelector } from '../../../utilities/recipies.util';
import { useGlobalAction } from '../../../store/slices/global.slice';
import { useAuthAction } from '../../../store/slices/auth.slice';

// component
import SettingsNav from '../../../components/global/SettingsNav';
import AlertDialog from '../../../components/global/AlertDialog';

const UsernamePage = (props) => {
    const loading = useASelector((state) => state.global.loading, []);
    const profile = useASelector((state) => state.auth.profile, []);

    const [username, setUsername] = useState(profile.username);
    const [usernameValid, setUsernameValid] = useState(false);

    const setLoading = useGlobalAction('setLoading');
    const updateProfile = useAuthAction('updateProfile');

    const handleChange = (e) => {
        if (e.target.value.trim().length === 0) {
            setUsernameValid(true);
        } else {
            setUsernameValid(false);
        }
        setUsername(e.target.value.trim());
    };

    const handleClick = () => {
        const data = {
            id: profile.id,
            username,
        };
        setLoading(true);
        updateProfile({ data });
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
                            <span style={{ fontWeight: 500, fontSize: 19 }}>CHANGE USERNAME</span>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    name="username"
                                    value={username}
                                    error={usernameValid}
                                    fullWidth
                                    className="mt-20"
                                    helperText={!usernameValid ? `https://streamefans.com/${profile.username}` : "This field is required"}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">@</InputAdornment>,
                                    }}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 60 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={usernameValid || loading}
                                style={{ borderRadius: 100, fontWeight: 'bold', color: 'white', marginRight: '2.5%' }}
                                endIcon={loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <></>}
                                onClick={handleClick}
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

export default React.memo(UsernamePage);