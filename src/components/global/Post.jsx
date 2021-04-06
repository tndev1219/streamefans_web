import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Slider from "react-slick";
import ReactPlayer from 'react-player/lazy';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

// material ui
import {
    Box,
    Grid,
    Avatar,
    IconButton,
    Button,
    Divider,
    withWidth,
    TextField,
} from '@material-ui/core';
// import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AssistantOutlinedIcon from '@material-ui/icons/AssistantOutlined';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { usePostAction } from '../../store/slices/post.slice';

// component
import Badge from '../../components/global/Badge';
import appConfig from '../../constants/AppConfig';
import { getPostDate, getCommentDate } from '../../utilities';

const PostComponent = (props) => {
    const postSettings = {
        dots: false,
        infinite: false,
        lazyLoad: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 1,
        rows: 1,
        centerMode: true,
        className: 'post-image-slider',
    };

    const post = props.post;

    const imageList = [];
    post.post_files.map((postFile, index) => {
        if (postFile.type === 'image') {
            imageList.push(postFile.post_file);
        }
        return null;
    });

    const history = useHistory();

    const language = useASelector((state) => state.global.language, []);
    const profile = useASelector((state) => state.auth.profile, []);

    const alreadyLiked = post.post_likes.filter(postLike => postLike.user === profile.id);

    const [bookmarked, setBookMarked] = useState(false);
    const [showImageOverlay, setShowImageOverlay] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [comment, setComment] = useState('');

    const like = usePostAction('like');
    const unlike = usePostAction('unlike');
    const addComment = usePostAction('addComment');

    const hangleChage = (e) => {
        setComment(e.target.value);
    };

    return (
        <Box>
            <Grid container direction="column" justify="center" className="mt-20">
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginBottom: 20 }}>
                    <Grid container direction="row" alignItems="center" justify="space-between">
                        <Grid
                            item
                            style={{ display: 'flex', cursor: 'pointer' }}
                            onClick={() => {
                                if (profile.username === post.user.username) {
                                    history.push('/profile');
                                } else {
                                    history.push(`/profile/${post.user.username}`);
                                }
                            }}
                        >
                            <Badge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                            >
                                <Avatar alt="my-avatar" src={`${appConfig.URL}${post.user.avatar}`} variant="circular" style={{ width: 50, height: 50 }} />
                            </Badge>
                            <Box style={{ marginLeft: 20, height: 10 }}>
                                <p style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>{post.user.display_name}</p>
                                <p style={{ marginTop: -13, fontSize: 13, color: '#8a96a3' }}>{`@${post.user.username}`}</p>
                            </Box>
                        </Grid>
                        <Grid item>
                            <span style={{ color: '#8a96a3', fontSize: 15 }}>{getPostDate(post.created_at, language)}</span>
                            <IconButton>
                                <MoreHorizRoundedIcon style={{ color: '#8a96a3' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {post.post_description.length !== 0 && <p>{post.post_description}</p>}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                    {post.post_files.length !== 0 &&
                        <Slider {...postSettings} style={{ width: '100%' }}>
                            {post.post_files.map((postFile, index) => (
                                <Box key={index}>
                                    {
                                        postFile.type === 'image' &&
                                        <Box
                                            style={{
                                                backgroundImage: `url(${appConfig.URL}${postFile.post_file})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                width: '100%',
                                                height: props.width === 'xs' ? 300 : 500,
                                                borderRadius: '10px 10px 10px 10px',
                                            }}
                                            onClick={() => {
                                                imageList.map((image, index) => {
                                                    if (image === postFile.post_file) {
                                                        setImageIndex(index);
                                                    }
                                                    return null;
                                                });
                                                setShowImageOverlay(true);
                                            }}
                                        ></Box>
                                    }
                                    {
                                        postFile.type === 'video' &&
                                        <ReactPlayer
                                            url={`${appConfig.URL}${postFile.post_file}`}
                                            width={'100%'}
                                            height={'100%'}
                                            config={{
                                                file: {
                                                    attributes: {
                                                        controls: true,
                                                        controlsList: ['nodownload'],
                                                        disablePictureInPicture: true,
                                                    },
                                                },
                                            }}
                                        />
                                    }
                                </Box>
                            ))}
                        </Slider>
                    }
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            <IconButton
                                onClick={() => {
                                    const data = {
                                        post_id: post.id,
                                    };
                                    if (alreadyLiked.length !== 0) {
                                        unlike({ data });
                                    } else {
                                        like({ data });
                                    }
                                }}
                            >
                                {alreadyLiked.length !== 0 ? <FavoriteRoundedIcon color="primary" /> : <FavoriteBorderRoundedIcon style={{ color: '#8a96a3' }} />}
                            </IconButton>
                            <IconButton
                                onClick={() => setShowCommentForm(!showCommentForm)}
                            >
                                {showCommentForm ? <AssistantOutlinedIcon color="primary" /> : <AssistantOutlinedIcon style={{ color: '#8a96a3' }} />}
                            </IconButton>
                            <Button
                                startIcon={<AttachMoneyRoundedIcon />}
                                style={{ fontWeight: 'bold', borderRadius: 100, color: '#8a96a3' }}
                            >
                                {language ? "チップを送る" : "SEND TIP"}
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
                    <p style={{ marginLeft: 10, fontSize: 13 }}>{post.post_likes.length} {language ? "いいね" : "likes"} ・ {post.post_comments.length} {language ? "コメント" : "comments"} ・ ${post.post_tips_amount} {language ? "チップ" : "tips"}</p>
                </Grid>
                {showCommentForm &&
                    <>
                        {
                            post.post_comments.map((postComment, index) => (
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                    <Avatar alt="my-avatar" src={`${appConfig.URL}${postComment.user.avatar}`} variant="circular" style={{ width: 40, height: 40 }} />
                                    <Box style={{ marginLeft: 10 }}>
                                        <p style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold', fontSize: 13 }}>
                                            <span>{postComment.user.display_name}</span>
                                            <span style={{ fontWeight: 100, marginLeft: 10 }}>{postComment.comment_text}</span>
                                        </p>
                                        <p style={{ marginTop: 0, marginBottom: 5, fontSize: 13, color: '#8a96a3' }}>{getCommentDate(postComment.created_at, language)}</p>
                                    </Box>
                                </Grid>
                            ))
                        }
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginBottom: 10 }}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                size="small"
                                placeholder="comment..."
                                InputProps={{
                                    startAdornment: <img src={`${appConfig.URL}${profile.avatar}`} alt="profile-img" style={{ width: 30, height: 30, borderRadius: 100, marginRight: 10, marginLeft: -5 }} />,
                                    endAdornment:
                                        <IconButton
                                            disabled={comment.length === 0}
                                            style={{ marginRight: -13 }}
                                            onClick={() => {
                                                const data = {
                                                    post_id: post.id,
                                                    comment_text: comment,
                                                };
                                                addComment({ data });
                                            }}
                                        >
                                            {comment.length === 0 ? <SendRoundedIcon /> : <SendRoundedIcon color="primary" />}
                                        </IconButton>,
                                }}
                                style={{ backgroundColor: '#eee' }}
                                onChange={hangleChage}
                            />
                        </Grid>
                    </>
                }
            </Grid>

            <Divider />
            {showImageOverlay && (
                <Lightbox
                    mainSrc={`${appConfig.URL}${imageList[imageIndex]}`}
                    nextSrc={`${appConfig.URL}${imageList[(imageIndex + 1) % imageList.length]}`}
                    prevSrc={`${appConfig.URL}${imageList[(imageIndex + imageList.length - 1) % imageList.length]}`}
                    onCloseRequest={() => setShowImageOverlay(false)}
                    onMovePrevRequest={() =>
                        setImageIndex((imageIndex + imageList.length - 1) % imageList.length)
                    }
                    onMoveNextRequest={() =>
                        setImageIndex((imageIndex + 1) % imageList.length)
                    }
                    // discourageDownloads={true}
                    animationOnKeyInput={true}
                />
            )}
        </Box>
    );
};

PostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default React.memo(withWidth()(PostComponent));