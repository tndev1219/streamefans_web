import React, { Fragment } from 'react';

// material ui
import {
    Container,
    Grid,
} from '@material-ui/core';

// component
import SettingsNav from '../../components/global/SettingsNav';

const ChangelogPage = (props) => {

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={7} />
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(ChangelogPage);