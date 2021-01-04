import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, IconButton, AppBar, Box, Menu, MenuItem, RadioGroup, FormControlLabel, Radio, Divider } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

// component

const tabItems = [
    {
        label: 'Favorites',
        count: 0,
        avatars: [],
    },
    {
        label: 'Bookmarks',
        count: 0,
        avatars: [],
    },
    {
        label: 'Close Friends',
        count: 1,
        avatars: [
            'https://public.onlyfans.com/files/thumbs/c50/h/hy/hyl/hylf1g07d1v4sgmovveqzwutqt4xskdk1606574921/avatar.jpg',
        ],
    },
    {
        label: 'Following',
        count: 6,
        avatars: [
            'https://public.onlyfans.com/files/thumbs/c50/h/hy/hyl/hylf1g07d1v4sgmovveqzwutqt4xskdk1606574921/avatar.jpg',
            'https://public.onlyfans.com/files/thumbs/c50/v/vm/vmg/vmglldmuqric9wx8jirmizwv3x9sz0od1601658770/avatar.jpg',
            'https://public.onlyfans.com/files/thumbs/c50/q/qn/qn6/qn6bfv3imzssm83wlfbhexdif7qiyngx1604339874/avatar.jpg',
            'https://public.onlyfans.com/files/thumbs/c50/g/gx/gx6/gx6l4kwfrscmpu7hhvuk4an8zqfadpda1606506291/avatar.jpg',
            'https://public.onlyfans.com/files/thumbs/c50/t/th/thg/thgvg7xbgb4vbcpcnd3jnlqcrow4t4kd1607992299/avatar.jpg',
            'https://public.onlyfans.com/files/thumbs/c50/q/qn/qn6/qn6bfv3imzssm83wlfbhexdif7qiyngx1604339874/avatar.jpg',
        ],
    },
    {
        label: 'Restricted',
        count: 0,
        avatars: [],
    },
    {
        label: 'Blocked',
        count: 0,
        avatars: [],
    },
];

const ListsPage = (props) => {
    const history = useHistory();
    const [hoveredTab, setHoveredTab] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [timeFilterValue, setTimeFilterValue] = useState('Name');
    const [charactorFilterValue, setCharactorFilterValue] = useState('a');

    const handleMouseEnter = (index) => {
        setHoveredTab(index);
    };

    const handleMouseLeave = (index) => {
        setHoveredTab(null);
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

    const handleCharactorChange = (event) => {
        setCharactorFilterValue(event.target.value);
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>
                            <span style={{ fontWeight: 500, fontSize: 19 }}>LISTS</span>
                        </Box>
                        <Box>
                            <IconButton>
                                <AddRoundedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </AppBar>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, padding: 8 }}>
                            <p style={{ color: '#aaa', fontSize: 20 }}>{timeFilterValue}</p>
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
                                        <FormControlLabel value="Name" control={<Radio color="primary" />} label="Name" />
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <FormControlLabel value="Recent" control={<Radio color="primary" />} label="Recent" />
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <FormControlLabel value="People" control={<Radio color="primary" />} label="People" />
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <FormControlLabel value="Custom" control={<Radio color="primary" />} label="Custom" />
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {tabItems.map((item, index) => (
                            <>
                                <Box
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                    style={{ backgroundColor: hoveredTab === index ? 'rgba(0,145,234,.06)' : 'white', marginTop: 3, marginBottom: 3, padding: 8, borderRadius: 5, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <Box>
                                        <p style={{ marginBottom: 5, fontSize: 19, fontWeight: 500 }}>{item.label}</p>
                                        <p style={{ marginBottom: 0, fontSize: 14, color: '#8a96a3' }}>{item.count} people</p>
                                    </Box>
                                    <Box>
                                        {item.avatars.map((avatar, index, avatars) => (
                                            <span key={index} style={{ marginLeft: avatars.length !== 1 ? -18 : 0 }}>
                                                <img src={avatar} alt={`avatar${index}`} style={{ width: 35, height: 35, borderRadius: 100, border: '2px solid white' }} />
                                            </span>
                                        ))}
                                    </Box>
                                </Box>
                                <Divider />
                            </>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(ListsPage);