import React, { Fragment, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, Avatar, AppBar, Tabs, Tab, IconButton, Button, Divider } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import LabelOffOutlinedIcon from '@material-ui/icons/LabelOffOutlined';
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AssistantOutlinedIcon from '@material-ui/icons/AssistantOutlined';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import Slider from "react-slick";
import AvatarImg from '../../assets/avatar/Barrera.jpg';
import PostImg from '../../assets/images/original.jpg';

import { useASelector } from '../../utilities/recipies.util';

// component
import Badge from '../../components/global/Badge';
import Suggestion from '../../components/global/Suggestion';

const HomePage = (props) => {

    const settings = {
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
    const [like, setLike] = useState(false);
    const [bookmarked, setBookMarked] = useState(false);

    const profile = useASelector((state) => state.auth.profile, []);

    let slider = useRef();

    const next = () => {
        slider.slickNext();
    };

    const previous = () => {
        slider.slickPrev();
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
                                aria-label="simple tabs example"
                            >
                                <Tab label="HOME" style={{ fontWeight: 500 }} />
                                {profile.email_verified && <Tab label="PURCHASED" style={{ fontWeight: 500 }} />}
                                {profile.email_verified && <Tab label="PURCHASED" style={{ fontWeight: 500 }} />}
                            </Tabs>
                        </Grid>
                        <Grid item>
                            <IconButton>
                                <SearchRoundedIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="row" justify="space-between" spacing={5} className="mt-0 mb-0">
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
                        <Grid container direction="column" justify="center" className="mt-20">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginBottom: 20 }}>
                                <Grid container direction="row" alignItems="center" justify="space-between">
                                    <Grid item style={{ display: 'flex' }}>
                                        <Badge
                                            overlap="circle"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            variant="dot"
                                        >
                                            <Avatar alt="my-avatar" src={AvatarImg} variant="circular" style={{ width: 50, height: 50 }} />
                                        </Badge>
                                        <div style={{ marginLeft: 20, height: 10 }}>
                                            <p style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Chef Boy MD</p>
                                            <p style={{ marginTop: -13, fontSize: 13, color: '#8a96a3' }}>@chefbodymd</p>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <span style={{ color: '#8a96a3', fontSize: 15 }}>Yesterday</span>
                                        <IconButton>
                                            <MoreHorizRoundedIcon style={{ color: '#8a96a3' }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <p>Drills are one of the most essential tools in the arsenal of an orthopedic surgeon. It allows us to place hardware during surgery, and also place pins at the bedside for patients with longitudinally unstable fractures that require traction. Here’s a video of how to assemble a drill from your typical pin insertion tray. Swipe right to watch 👉🏽</p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                <img src={PostImg} alt='post img' style={{ width: '100%', borderRadius: 10 }} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Grid item>
                                        <IconButton onClick={() => setLike(!like)}>
                                            {like ? <FavoriteRoundedIcon style={{ color: '#8a96a3' }} /> : <FavoriteBorderRoundedIcon style={{ color: '#8a96a3' }} />}
                                        </IconButton>
                                        <IconButton>
                                            <AssistantOutlinedIcon style={{ color: '#8a96a3' }} />
                                        </IconButton>
                                        <Button
                                            startIcon={<AttachMoneyRoundedIcon />}
                                            style={{ fontWeight: 'bold', borderRadius: 100, color: '#8a96a3' }}
                                        >
                                            SEND TIP
                                                </Button>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => setBookMarked(!bookmarked)}>
                                            {bookmarked ? <BookmarkRoundedIcon style={{ color: '#8a96a3' }} /> : <BookmarkBorderRoundedIcon style={{ color: '#8a96a3' }} />}
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <p style={{ marginLeft: 10, fontSize: 13 }}>96 likes ・ 6 comments ・ $5.08 tips</p>
                            </Grid>
                        </Grid>

                        <Divider />

                        <Grid container direction="column" justify="center" className="mt-20">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginBottom: 20 }}>
                                <Grid container direction="row" alignItems="center" justify="space-between">
                                    <Grid item style={{ display: 'flex' }}>
                                        <Badge
                                            overlap="circle"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            variant="dot"
                                        >
                                            <Avatar alt="my-avatar" src={AvatarImg} variant="circular" style={{ width: 50, height: 50 }} />
                                        </Badge>
                                        <div style={{ marginLeft: 20, height: 10 }}>
                                            <p style={{ marginTop: 10, fontWeight: 'bold', fontSize: 15 }}>Chef Boy MD</p>
                                            <p style={{ marginTop: -13, fontSize: 13, color: '#8a96a3' }}>@chefbodymd</p>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <span style={{ color: '#8a96a3', fontSize: 15 }}>Yesterday</span>
                                        <IconButton>
                                            <MoreHorizRoundedIcon style={{ color: '#8a96a3' }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <p>Drills are one of the most essential tools in the arsenal of an orthopedic surgeon. It allows us to place hardware during surgery, and also place pins at the bedside for patients with longitudinally unstable fractures that require traction. Here’s a video of how to assemble a drill from your typical pin insertion tray. Swipe right to watch 👉🏽</p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                <img src={PostImg} alt='post img' style={{ width: '100%', borderRadius: 10 }} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Grid item>
                                        <IconButton onClick={() => setLike(!like)}>
                                            {like ? <FavoriteRoundedIcon style={{ color: '#8a96a3' }} /> : <FavoriteBorderRoundedIcon style={{ color: '#8a96a3' }} />}
                                        </IconButton>
                                        <IconButton>
                                            <AssistantOutlinedIcon style={{ color: '#8a96a3' }} />
                                        </IconButton>
                                        <Button
                                            startIcon={<AttachMoneyRoundedIcon />}
                                            style={{ fontWeight: 'bold', borderRadius: 100, color: '#8a96a3' }}
                                        >
                                            SEND TIP
                                                </Button>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => setBookMarked(!bookmarked)}>
                                            {bookmarked ? <BookmarkRoundedIcon style={{ color: '#8a96a3' }} /> : <BookmarkBorderRoundedIcon style={{ color: '#8a96a3' }} />}
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <p style={{ marginLeft: 10, fontSize: 13 }}>96 likes ・ 6 comments ・ $5.08 tips</p>
                            </Grid>
                        </Grid>
                    </Grid>
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
                                        <IconButton onClick={previous}>
                                            <ChevronLeftRoundedIcon />
                                        </IconButton>
                                        <IconButton onClick={next}>
                                            <ChevronRightRoundedIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Slider ref={c => (slider = c)} {...settings} style={{ width: '100%' }}>
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                </Slider>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(HomePage);