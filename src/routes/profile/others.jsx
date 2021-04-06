import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import PropTypes from 'prop-types';

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
    withWidth,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInNewOutlinedIcon from '@material-ui/icons/OpenInNewOutlined';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
// import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { usePostAction } from '../../store/slices/post.slice';
import { useGlobalAction } from '../../store/slices/global.slice';

// component
import Badge from '../../components/global/Badge';
import Post from '../../components/global/Post';
import appConfig from '../../constants/AppConfig';
import BackgroundImg from '../../assets/images/background_image.png';

const OthersProfilePage = (props) => {
    const history = useHistory();
    const params = useParams();

    const [anchorEl, setAnchorEl] = useState(null);

    const profile = useASelector((state) => state.auth.profile, []);
    const userDataLoading = useASelector((state) => state.global.userDataLoading, []);
    const selectedUserData = useASelector((state) => state.post.selectedUserData, []);

    const setAlertDialog = useGlobalAction('setAlertDialog');
    const setUserDataLoading = useGlobalAction('setUserDataLoading');
    const getUserData = usePostAction('getUserData');
    const follow = usePostAction('follow');
    const unfollow = usePostAction('unfollow');

    useEffect(() => {
        if (profile.username === params.username) {
            history.push('/profile');
        } else {
            setUserDataLoading(true);
            const data = { username: params.username };
            getUserData({ data });
        }
    }, []);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const subscribe = () => {
        const data = {
            username: params.username,
        };
        if (selectedUserData.followed) {
            unfollow({ data });
        } else {
            follow({ data });
        }
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row" justify="space-between">
                    {
                        !userDataLoading && selectedUserData.header_image ?
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Box
                                    style={{
                                        backgroundImage: `url(${appConfig.URL}${selectedUserData.header_image})`,
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
                                                <span className="mb-5" style={{ color: 'white', fontSize: 19, marginBottom: 2, fontWeight: 500 }}>{selectedUserData.username}</span>
                                                <span className="mt-5" style={{ color: 'white', fontSize: 14, marginTop: 2 }}>{selectedUserData.posts.length} posts</span>
                                            </Box>
                                        </Box>
                                        <Box className="mt-10 mr-10" style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                                            <IconButton onClick={openMenu}>
                                                <MoreVertIcon style={{ color: 'white' }} />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                getContentAnchorEl={null}
                                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                                open={Boolean(anchorEl)}
                                                onClose={closeMenu}
                                                variant="menu"
                                            >
                                                <MenuItem onClick={closeMenu}>Copy link to profile</MenuItem>
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
                                            <Avatar src={`${appConfig.URL}${selectedUserData.avatar}`} style={{ width: 110, height: 110, border: '2px solid white' }} />
                                        </Badge>
                                        <Box>
                                            {selectedUserData.followed &&
                                                <>
                                                    <IconButton variant="outlined" color="primary" style={{ border: '1px solid #00aff0', marginLeft: 10 }}>
                                                        <AttachMoneyRoundedIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        variant="outlined"
                                                        color="primary"
                                                        style={{ border: '1px solid #00aff0', marginLeft: 10 }}
                                                        onClick={() => setAlertDialog({ alertDialogState: true, alertDialogMessage: 'First, enter your payment information.' })}
                                                    >
                                                        <MessageOutlinedIcon />
                                                    </IconButton>
                                                </>
                                            }
                                            {/* <IconButton variant="outlined" color="primary" style={{ border: '1px solid #00aff0', marginLeft: 10 }}>
                                                <StarBorderRoundedIcon />
                                            </IconButton> */}
                                            <IconButton variant="outlined" color="primary" style={{ border: '1px solid #00aff0', marginLeft: 10 }}>
                                                <OpenInNewOutlinedIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box style={{ width: '95%' }}>
                                        <p style={{ marginTop: 20, fontWeight: 500, fontSize: 19 }}>{selectedUserData.username}</p>
                                        <p style={{ marginTop: -10, fontSize: 14, color: '#aaa' }}>@{selectedUserData.username}・Active</p>
                                        <p style={{ marginTop: 30, fontSize: 18 }}>{selectedUserData.bio}</p>
                                    </Box>
                                </Box>
                                <Grid container direction="column" alignItems="flex-start" style={{ border: '1px solid #ddd', borderRadius: 6, padding: 15 }}>
                                    <Grid item>
                                        <p style={{ fontWeight: 500, fontSize: 19 }}>Free Subscription</p>
                                    </Grid>
                                    <Grid item style={{ width: '100%' }}>
                                        {selectedUserData.followed ?
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                fullWidth
                                                onClick={subscribe}
                                                style={{ borderRadius: 100, fontWeight: 'bold', height: 35 }}
                                            >
                                                FOLLOWING
                                            </Button>
                                            :
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                onClick={subscribe}
                                                style={{ borderRadius: 100, fontWeight: 'bold', color: 'white', height: 35 }}
                                            >
                                                FOLLOW FOR FREE
                                            </Button>
                                        }
                                    </Grid>
                                </Grid>
                                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                                    {selectedUserData.posts.length === 0 ?
                                        <span style={{ fontWeight: 500, fontSize: 18 }}>NO POSTS YET</span>
                                        :
                                        <span style={{ fontWeight: 500, fontSize: 18 }}>{selectedUserData.posts.length} POSTS</span>
                                    }
                                    <Box>
                                        <IconButton disabled>
                                            <SearchRoundedIcon />
                                        </IconButton>
                                        <IconButton disabled>
                                            <FilterListRoundedIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                {selectedUserData.followed ?
                                    selectedUserData.posts.map((post, index) => (
                                        <Post key={index} post={post} />
                                    ))
                                    :
                                    <Box
                                        style={{
                                            backgroundImage: `url(${BackgroundImg})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            width: '100%',
                                            height: props.width === 'xs' ? 300 : 500,
                                            borderRadius: 10,
                                            marginBottom: 30,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <LockOutlinedIcon
                                            style={{
                                                position: 'absolute',
                                                bottom: props.width === 'xs' ? 150 : 250,
                                                fontSize: 50,
                                                color: '#ccc',
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={subscribe}
                                            style={{ borderRadius: 100, color: 'white', height: 35, marginBottom: 20 }}
                                        >
                                            SUBSCRIBE TO SEE USER`S POSTS
                                        </Button>
                                    </Box>
                                }
                            </Grid>
                            :
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress color="primary" style={{ marginTop: 150 }} />
                            </Grid>
                    }
                </Grid>
            </Container>
        </Fragment >
    );
};

OthersProfilePage.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default React.memo(withWidth()(OthersProfilePage));