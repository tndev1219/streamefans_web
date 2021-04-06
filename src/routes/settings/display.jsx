import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    Box,
    Divider,
    // Switch,
    IconButton,
    Hidden,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
// import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';

// component
import SettingsNav from '../../components/global/SettingsNav';

const DisplayPage = (props) => {
    const history = useHistory();
    const [hoveredTab, setHoveredTab] = useState(null);

    const language = useASelector((state) => state.global.language, []);

    const setLanguageModal = useGlobalAction('setLanguageModal');

    const handleMouseEnter = (index) => {
        setHoveredTab(index);
    };

    const handleMouseLeave = (index) => {
        setHoveredTab(null);
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row" justify="center">
                    <Hidden smDown>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', minHeight: '100vh' }}>
                            <SettingsNav index={5} />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={10} md={8} lg={8} xl={8} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <Hidden mdUp>
                                <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                    <ArrowBackRoundedIcon />
                                </IconButton>
                            </Hidden>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>{language ? '表示' : 'DISPLAY'}</span>
                        </Box>
                        <Box style={{ height: 10, backgroundColor: '#eee', borderTop: '1px solid #ddd' }}></Box>

                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>{language ? 'ビューのカスタマイズ' : 'Customize your view'}</Box>
                        <Divider />

                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                            <Box
                                onMouseEnter={() => handleMouseEnter(0)}
                                onMouseLeave={() => handleMouseLeave(0)}
                                onClick={() => setLanguageModal(true)}
                                style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: hoveredTab === 0 ? 'rgba(0,145,234,.06)' : 'white', cursor: 'pointer' }}
                            >
                                <span>{language ? '言語' : 'Language'}</span>
                                {/* <KeyboardArrowRightRoundedIcon color={hoveredTab === 0 ? "primary" : "inherit"} /> */}
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