import React, { Fragment, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    AppBar,
    IconButton,
    Button,
    TextField,
    Divider,
    CircularProgress,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
// import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';
import { usePostAction } from '../../store/slices/post.slice';

// component

const PostsPage = (props) => {
    const fileInput = useRef();
    const history = useHistory();
    const [imageList, setImageList] = useState([]);
    const [text, setText] = useState('');

    const loading = useASelector((state) => state.global.loading, []);

    const setSnackBar = useGlobalAction('setSnackBar');
    const setLoading = useGlobalAction('setLoading');
    const createPost = usePostAction('createPost');

    const handleUploadChange = (e) => {
        const file = e.target.files[0];
        if (!file) { return; }

        const newImageList = imageList.filter(image => image);

        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];

            const alreadyUploadedFileList = imageList.filter((image) => image.filename === file.name);

            if (alreadyUploadedFileList.length !== 0) {
                setSnackBar({ snackBarState: true, snackBarVariant: 'warning', snackBarMessage: 'Media has already added. Please choose another.' });
            } else {
                newImageList.push({
                    url: URL.createObjectURL(file),
                    type: file.type.split('/')[0],
                    filename: file.name,
                    file,
                });
            }
        }

        setImageList(newImageList);
    };

    const removeImage = (filename) => {
        const newImageList = imageList.filter(image => (image.filename !== filename));

        setImageList(newImageList);
    };

    const handleClick = () => {
        const data = new FormData();
        imageList.map(image => {
            data.append('files', image.file);
            return null;
        });
        data.append('post_description', text);

        setLoading(true);

        createPost({ data });
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                        <ArrowBackRoundedIcon />
                                    </IconButton>
                                    <span style={{ fontWeight: 500, fontSize: 19 }}>NEW POST</span>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ borderRadius: 100, width: 80, fontWeight: 'bold', color: 'white' }}
                                        onClick={handleClick}
                                        disabled={(text.length === 0 && imageList.length === 0) || loading}
                                        endIcon={loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <></>}
                                    >
                                        POST
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-20" style={{ display: 'flex', alignItems: 'center' }}>
                        {imageList.map((media, index) => (
                            <div
                                onClick={() => removeImage(media.filename)}
                                key={index}
                                style={{
                                    backgroundImage: `url(${media.url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: 100,
                                    height: 100,
                                    borderRadius: 6,
                                    marginRight: 10,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton> <HighlightOffOutlinedIcon color="primary" /> </IconButton>
                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-20">
                        <TextField
                            id="outlined-multiline-static"
                            label="New Post"
                            multiline
                            variant="outlined"
                            fullWidth={true}
                            placeholder={imageList.length === 0 ? "Compose new post..." : "Add a description..."}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-20">
                        <input
                            ref={fileInput}
                            accept="image/*, video/*, .mkv"
                            hidden
                            type="file"
                            multiple
                            onChange={handleUploadChange}
                        />
                        <IconButton onClick={() => fileInput.current.click()}>
                            <CropOriginalIcon />
                        </IconButton>
                        {/* <IconButton>
                            <PollOutlinedIcon />
                        </IconButton> */}
                        <Divider />
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(PostsPage);