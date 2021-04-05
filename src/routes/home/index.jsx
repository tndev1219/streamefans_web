import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    AppBar,
    Tabs,
    Tab,
    IconButton,
    Button,
} from '@material-ui/core';
// import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import LabelOffOutlinedIcon from '@material-ui/icons/LabelOffOutlined';
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { usePostAction } from '../../store/slices/post.slice';
import { useAuthAction } from '../../store/slices/auth.slice';

// component
import Suggestion from '../../components/global/Suggestion';
import Post from '../../components/global/Post';
import Slider from "react-slick";

const HomePage = (props) => {

    const suggestionSettings = {
        dots: true,
        infinite: false,
        lazyLoad: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 1,
        rows: 3,
        customPaging: i => (
            <div
                style={{
                    width: 4,
                    height: 4,
                    backgroundColor: sliderIndex === i ? '#8a96a3' : 'white',
                    border: "1px #8a96a3 solid ",
                    borderRadius: 50,
                }}
            >
            </div>
        ),
        appendDots: dots => (
            <div>
                <ul style={{ marginTop: -10 }}> {dots} </ul>
            </div>
        ),
        beforeChange: (current, next) => setSliderIndex(next),
    };

    const history = useHistory();
    const [tabIndex, setTabIndex] = useState(0);
    const [freeSugg, setFreeSugg] = useState(true);
    const [sliderIndex, setSliderIndex] = useState(0);

    const profile = useASelector((state) => state.auth.profile, []);
    const users = useASelector((state) => state.auth.users, []);
    const posts = useASelector((state) => state.post.posts, []);

    const getSuggestionUsers = useAuthAction('getSuggestionUsers');
    const getPosts = usePostAction('getPosts');

    let suggestionSlider = useRef();

    useEffect(() => {
        getSuggestionUsers();
        getPosts();
    }, []);

    const nextSuggestion = () => {
        suggestionSlider.slickNext();
    };

    const previousSuggestion = () => {
        suggestionSlider.slickPrev();
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                    <Grid container direction="row" justify="space-between">
                        <Grid item>
                            <Tabs
                                value={tabIndex}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={(e, index) => setTabIndex(index)}
                            >
                                <Tab label="HOME" style={{ fontWeight: 500 }} />
                                {/* {profile.email_verified && <Tab label="PURCHASED" style={{ fontWeight: 500 }} />}
                                {profile.email_verified && <Tab label="PURCHASED" style={{ fontWeight: 500 }} />} */}
                            </Tabs>
                        </Grid>
                        {/* <Grid item>
                            <IconButton>
                                <SearchRoundedIcon />
                            </IconButton>
                        </Grid> */}
                    </Grid>
                </AppBar>
                <Grid container direction="row-reverse" justify="space-between" spacing={5} className="mt-0 mb-0">
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Grid container discription="suggestion part">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} discription="suggestion header">
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Grid item>
                                        <span style={{ color: '#8a96a3', fontWeight: 500, fontSize: 18 }}>SUGGESTIONS</span>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => setFreeSugg(!freeSugg)}>
                                            {freeSugg ? <LabelOutlinedIcon /> : <LabelOffOutlinedIcon />}
                                        </IconButton>
                                        <IconButton>
                                            <SyncRoundedIcon />
                                        </IconButton>
                                        <IconButton onClick={previousSuggestion}>
                                            <ChevronLeftRoundedIcon />
                                        </IconButton>
                                        <IconButton onClick={nextSuggestion}>
                                            <ChevronRightRoundedIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Slider ref={c => (suggestionSlider = c)} {...suggestionSettings} style={{ width: '100%' }}>
                                    {users.map((user, index) => (
                                        <Suggestion key={index} userInfo={user} />
                                    ))}
                                </Slider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                        {!profile.email_verified &&
                            <Grid container direction="row" justify="space-between" alignItems="center" style={{ backgroundColor: 'rgba(231,108,108,.12)', color: '#e76c6c', height: 60, paddingRight: 15, paddingLeft: 15, borderRadius: 10 }}>
                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    Please verify your email address
                                    </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        onClick={() => history.push('/settings/account/email')}
                                        style={{ borderRadius: 100, width: 160, backgroundColor: '#00aff0', color: 'white' }}
                                    >
                                        Go to settings
                                    </Button>
                                </Grid>
                            </Grid>
                        }

                        {
                            posts.map((post, index) => (
                                <Post key={index} post={post} />
                            ))
                        }
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(HomePage);