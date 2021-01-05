import React, { Fragment } from 'react';
import { Container, Grid, Box, Divider, Switch } from '@material-ui/core';

// component
import SettingsNav from '../../components/global/SettingsNav';

const profileTabLabels = [
    {
        id: 0,
        label: 'Show activity status',
    },
    {
        id: 1,
        label: "Show subscription offers",
    },
];

const SecurityPage = (props) => {

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={2} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>PRIVACY AND SAFETY</span>
                        </Box>
                        <Box style={{ height: 10, backgroundColor: '#eee', borderTop: '1px solid #ddd' }}></Box>

                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>Profile</Box>
                        <Divider />
                        {profileTabLabels.map((item) => (
                            <Box key={item.id}>
                                <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                                    <Box
                                        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, paddingLeft: 10, paddingRight: 10, cursor: 'pointer' }}
                                    >
                                        <span>{item.label}</span>
                                        <Switch
                                            // checked={check}
                                            // onChange={handleChange}
                                            name="checkedA"
                                            color="primary"
                                        />
                                    </Box>
                                </Box>
                                <Divider></Divider>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(SecurityPage);