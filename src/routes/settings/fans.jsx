import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    Box,
    Divider,
    IconButton,
    Hidden,
} from '@material-ui/core';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';

// component
import SettingsNav from '../../components/global/SettingsNav';

const FansPage = (props) => {
    const history = useHistory();
    const [hoveredTab, setHoveredTab] = useState(null);

    const language = useASelector((state) => state.global.language, []);

    const fansTabLabels = [
        {
            id: 0,
            label: language ? '以下の価格' : 'Following price',
            path: '/settings/subscription',
        },
    ];

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
                            <SettingsNav index={3} />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={10} md={8} lg={8} xl={8} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <Hidden mdUp>
                                <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                    <ArrowBackRoundedIcon />
                                </IconButton>
                            </Hidden>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>{language ? 'ファンとフォロー' : 'FANS AND FOLLOWING'}</span>
                        </Box>
                        <Box style={{ height: 10, backgroundColor: '#eee', borderTop: '1px solid #ddd' }}></Box>

                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>{language ? 'おすすめの報酬' : 'Reward for subscriber referrals'}</Box>
                        <Divider />
                        {fansTabLabels.map((item) => (
                            <Box key={item.id}>
                                <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5 }}>
                                    <Box
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={() => handleMouseLeave(item.id)}
                                        onClick={() => history.push(item.path)}
                                        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: hoveredTab === item.id ? 'rgba(0,145,234,.06)' : 'white', cursor: 'pointer' }}
                                    >
                                        <span>{item.label}</span>
                                        <KeyboardArrowRightRoundedIcon color={hoveredTab === item.id ? "primary" : "inherit"} />
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

export default React.memo(FansPage);