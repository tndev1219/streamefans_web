import React, { Fragment, useState } from 'react';
// import { useHistory } from "react-router-dom";
import {
    Container,
    Grid,
    Box,
    Divider,
    // Switch,
} from '@material-ui/core';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

// component
import SettingsNav from '../../components/global/SettingsNav';

const DisplayPage = (props) => {
    // const history = useHistory();
    const [hoveredTab, setHoveredTab] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredTab(index);
    };

    const handleMouseLeave = (index) => {
        setHoveredTab(null);
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row">
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee', minHeight: '100vh' }}>
                        <SettingsNav index={5} />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} style={{ borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>DISPLAY</span>
                        </Box>
                        <Box style={{ height: 10, backgroundColor: '#eee', borderTop: '1px solid #ddd' }}></Box>

                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>Customize your view</Box>
                        <Divider />

                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                            <Box
                                onMouseEnter={() => handleMouseEnter(0)}
                                onMouseLeave={() => handleMouseLeave(0)}
                                // onClick={() => history.push('/settings/display/language')}
                                style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: hoveredTab === 0 ? 'rgba(0,145,234,.06)' : 'white', cursor: 'pointer' }}
                            >
                                <span>Language</span>
                                <KeyboardArrowRightRoundedIcon color={hoveredTab === 0 ? "primary" : "inherit"} />
                            </Box>
                        </Box>
                        <Divider></Divider>

                        {/* <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                            <Box
                                style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, paddingLeft: 10, paddingRight: 10, cursor: 'pointer' }}
                            >
                                <span>Dark mode</span>
                                <Switch
                                    // checked={check}
                                    // onChange={handleChange}
                                    name="checkedA"
                                    color="primary"
                                />
                            </Box>
                        </Box>
                        <Divider></Divider> */}

                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(DisplayPage);