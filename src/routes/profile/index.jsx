import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    IconButton,
    Box,
    Avatar,
    Button,
    Menu,
    MenuItem,
    CircularProgress,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
// import OpenInNewOutlinedIcon from '@material-ui/icons/OpenInNewOutlined';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';
import { usePostAction } from '../../store/slices/post.slice';

// component
import Badge from '../../components/global/Badge';
import Post from '../../components/global/Post';
import appConfig from '../../constants/AppConfig';

const MyProfilePage = (props) => {
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);

    const profile = useASelector((state) => state.auth.profile, []);
    const userDataLoading = useASelector((state) => state.global.userDataLoading, []);
    const selectedUserData = useASelector((state) => state.post.selectedUserData, []);

    const setUserDataLoading = useGlobalAction('setUserDataLoading');
    const getUserData = usePostAction('getUserData');

    useEffect(() => {
        setUserDataLoading(true);
        const data = { username: profile.username };
        getUserData({ data });
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box
                            style={{
                                backgroundImage: `url(${appConfig.URL}${profile.header_image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: 250,
                                borderRadius: '0px 0px 6px 6px',
                                marginTop: 50,
                            }}
                        >
                            <Box style={{ display: 'flex', height: 120 }}>
                                <Box className="mt-10 ml-10" style={{ width: '80%', display: 'flex', justifyContent: 'flex-start', alignItems: 'end' }}>
                                    <IconButton onClick={() => history.goBack()}>
                                        <ArrowBackRoundedIcon style={{ color: 'white' }} />
                                    </IconButton>
                                    <Box style={{ display: 'grid' }}>
                                        <span className="mb-5" style={{ color: 'white', fontSize: 19, marginBottom: 2, fontWeight: 500 }}>{profile.username}</span>
                                        {
                                            selectedUserData.posts &&
                                            <span className="mt-5" style={{ color: 'white', fontSize: 14, marginTop: 2 }}>{selectedUserData.posts.length} posts</span>
                                        }
                                    </Box>
                                </Box>
                                <Box className="mt-10 mr-10" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                                    <IconButton onClick={handleClick}>
                                        <MoreVertIcon style={{ color: 'white' }} />
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
                                        <MenuItem onClick={handleClose}>Copy link to profile</MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '95%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Badge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                    style={{ marginTop: -35 }}
                                >
                                    <Avatar src={`${appConfig.URL}${profile.avatar}`} style={{ width: 110, height: 110, border: '2px solid white' }} />
                                </Badge>
                                <Box>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<SettingsOutlinedIcon />}
                                        style={{ borderRadius: 100, fontWeight: 'bold', height: 50 }}
                                        onClick={() => history.push('/settings/profile')}
                                    >
                                        Edit Profile
                                    </Button>
                                    {/* <IconButton variant="outlined" color="primary" style={{ border: '1px solid #00aff0' }}>
                                        <OpenInNewOutlinedIcon />
                                    </IconButton> */}
                                </Box>
                            </Box>
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '95%' }}>
                                <p style={{ marginTop: 20, fontWeight: 500, fontSize: 19 }}>{profile.username}</p>
                                <p style={{ marginTop: -10, fontSize: 14, color: '#aaa' }}>@{profile.username}・Active</p>
                                <p style={{ marginTop: 30, fontSize: 18 }}>{profile.bio}</p>
                            </Box>
                        </Box>
                        {
                            !userDataLoading ?
                                selectedUserData.posts.length === 0 ?
                                    <>
                                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                                            <span style={{ fontWeight: 500, fontSize: 18 }}>NO POSTS YET</span>
                                            <Box>
                                                <IconButton disabled>
                                                    <SearchRoundedIcon />
                                                </IconButton>
                                                <IconButton disabled>
                                                    <FilterListRoundedIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => history.push('/posts')}
                                                style={{ borderRadius: 100, fontWeight: 'bold', border: 0 }}
                                            >
                                                CREATE NEW POST
                                        </Button>
                                        </Box>
                                    </>
                                    :
                                    <>
                                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                                            <span style={{ fontWeight: 500, fontSize: 18 }}>{selectedUserData.posts.length} POSTS</span>
                                            <Box>
                                                <IconButton disabled>
                                                    <SearchRoundedIcon />
                                                </IconButton>
                                                <IconButton disabled>
                                                    <FilterListRoundedIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        {
                                            selectedUserData.posts.map((post, index) => (
                                                <Post key={index} post={post} />
                                            ))
                                        }
                                    </>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <CircularProgress color="primary" style={{ marginTop: 50 }} />
                                </Grid>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(MyProfilePage);