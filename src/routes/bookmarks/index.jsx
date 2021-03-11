import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, IconButton, AppBar, Box, Menu, MenuItem, RadioGroup, FormControlLabel, Radio, Divider } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';

// component
import SnackBar from '../../components/global/SnackBar';

const tabItems = [
    {
        icon: <LibraryAddCheckOutlinedIcon />,
        label: 'ALL BOOKMARKS',
    },
    {
        icon: <PhotoOutlinedIcon />,
        label: 'PHOTOS',
    },
    {
        icon: <VideocamOutlinedIcon />,
        label: 'VIDEOS',
    },
    {
        icon: <MicNoneOutlinedIcon />,
        label: 'AUDIO',
    },
    {
        icon: <TextFieldsOutlinedIcon />,
        label: 'OTHER',
    },
    {
        icon: <LockOutlinedIcon />,
        label: 'LOCKED',
    },
];

const BookmarksPage = (props) => {
    const history = useHistory();
    const [hoveredTab, setHoveredTab] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [timeFilterValue, setTimeFilterValue] = useState('at');
    const [otherFilterValue, setOtherFilterValue] = useState('lp');
    const [charactorFilterValue, setCharactorFilterValue] = useState('a');

    const handleMouseEnter = (index) => {
        setHoveredTab(index);
    };

    const handleMouseLeave = (index) => {
        setHoveredTab(null);
    };

    const handleClick = (index) => {
        setSelectedTab(index);
    };

    const handleFilter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTimeChange = (event) => {
        setTimeFilterValue(event.target.value);
    };

    const handleOtherChange = (event) => {
        setOtherFilterValue(event.target.value);
    };

    const handleCharactorChange = (event) => {
        setCharactorFilterValue(event.target.value);
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row" justify="space-between" spacing={6}>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                    <ArrowBackRoundedIcon />
                                </IconButton>
                                <span style={{ fontWeight: 500, fontSize: 19 }}>BOOKMARKS</span>
                            </Box>
                        </AppBar>
                        {tabItems.map((item, index) => (
                            <Box key={index} style={{ borderBottom: '1px solid #ccc', height: 50, display: 'flex', alignItems: 'center', cursor: 'pointer', margin: 5 }}>
                                <Box
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                    onClick={() => handleClick(index)}
                                    style={{ color: hoveredTab === index ? '#00aff0' : selectedTab === index ? 'black' : '#aaa', borderBottom: selectedTab === index ? '2px solid black' : '', height: '100%', display: 'flex', alignItems: 'center' }}
                                >
                                    {item.icon}
                                    <span style={{ fontWeight: 500, fontSize: 18, marginLeft: 15 }}>{item.label}</span>
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 500, fontSize: 19, color: '#aaa' }}>{tabItems[selectedTab].label}</span>
                                <IconButton onClick={handleFilter} style={{ color: '#aaa' }}>
                                    <FilterListRoundedIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    variant="menu"
                                >
                                    <RadioGroup aria-label="time filter" name="time filter" value={timeFilterValue} onChange={handleTimeChange}>
                                        <MenuItem onClick={handleClose}>
                                            <FormControlLabel value="at" control={<Radio color="primary" />} label="All time" />
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <FormControlLabel value="ltm" control={<Radio color="primary" />} label="Last three months" />
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <FormControlLabel value="lm" control={<Radio color="primary" />} label="Last month" />
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <FormControlLabel value="lw" control={<Radio color="primary" />} label="Last week" />
                                        </MenuItem>
                                    </RadioGroup>
                                    <Divider />
                                    <RadioGroup aria-label="other filter" name="other filter" value={otherFilterValue} onChange={handleOtherChange}>
                                        <MenuItem onClick={handleClose}>
                                            <FormControlLabel value="lp" control={<Radio color="primary" />} label="Latest posts" />
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <FormControlLabel value="ml" control={<Radio color="primary" />} label="Most liked" />
                                        </MenuItem>
                                    </RadioGroup>
                                    <Divider />
                                    <RadioGroup aria-label="charactor filter" name="charactor filter" value={charactorFilterValue} onChange={handleCharactorChange}>
                                        <MenuItem onClick={handleClose}>
                                            <FormControlLabel value="a" control={<Radio color="primary" />} label="Ascending" />
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <FormControlLabel value="d" control={<Radio color="primary" />} label="Descending" />
                                        </MenuItem>
                                    </RadioGroup>
                                </Menu>
                            </Box>
                        </AppBar>
                        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
                            <p style={{ fontWeight: 500, color: '#8a96a3' }}>No Bookmarks yet</p>
                        </Box>
                    </Grid>
                </Grid>
                <SnackBar />
            </Container>
        </Fragment >
    );
};

export default React.memo(BookmarksPage);