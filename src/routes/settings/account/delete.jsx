import React, { Fragment } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    Box,
    Divider,
    Button,
    CircularProgress,
} from '@material-ui/core';

// custom hooks
import { useASelector } from '../../../utilities/recipies.util';
import { useGlobalAction } from '../../../store/slices/global.slice';
import { useAuthAction } from '../../../store/slices/auth.slice';

// component
import SettingsNav from '../../../components/global/SettingsNav';

const DeletePage = (props) => {
    const history = useHistory();

    const language = useASelector((state) => state.global.language, []);
    const loading = useASelector((state) => state.global.loading, []);
    const profile = useASelector((state) => state.auth.profile, []);

    const setLoading = useGlobalAction('setLoading');
    const deleteAccount = useAuthAction('deleteAccount');

    const handleClick = () => {
        const data = {
            id: profile.id,
        };

        const meta = {
            redirect: history.push,
            path: '/login',
        };
        setLoading(true);
        deleteAccount({ data, meta });
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
                            <span style={{ fontWeight: 500, fontSize: 19 }}>{language ? 'アカウントを削除' : 'DELETE ACCOUNT'}</span>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, marginTop: 10 }}>
                            <Box style={{ width: '95%' }}>
                                <p className="mb-10" style={{ color: 'red', marginTop: 20, marginBottom: 0 }}>{language ? 'アカウントが完全に削除されます。' : 'This will permanently delete your account!'}</p>
                            </Box>
                        </Box>
                        <Divider />

                        <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 60 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                disabled={loading}
                                endIcon={loading ? <CircularProgress size={20} color="primary" /> : <></>}
                                style={{ borderRadius: 100, fontWeight: 'bold', marginRight: '2.5%' }}
                                onClick={handleClick}
                            >
                                {language ? 'アカウントを削除' : 'DELETE ACCOUNT'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(DeletePage);