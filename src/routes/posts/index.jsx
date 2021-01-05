import React, { Fragment, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, AppBar, IconButton, Button, TextField, Divider } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
// import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
// component
import SnackBar from '../../components/global/SnackBar';

import { useGlobalAction } from '../../store/slices/global.slice';

const PostsPage = (props) => {
    const fileInput = useRef();
    const history = useHistory();
    const [imageList, setImageList] = useState([]);

    const setShowSnackBar = useGlobalAction('setShowSnackBar');

    const handleUploadChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = () => {
            const alreadyUploadedFileList = imageList.filter((image) => image.filename === file.name);

            if (alreadyUploadedFileList.length !== 0) {
                setShowSnackBar(true);
            } else {
                const newImageList = imageList.filter(image => image);
                newImageList.push({
                    url: `data:${file.type};base64,${btoa(reader.result)}`,
                    type: 'image',
                    filename: file.name,
                });
                
                setImageList(newImageList);
            }
        };

        reader.onerror = () => {
            console.log("error on load image");
        };
    };

    const removeImage = (filename) => {
        const newImageList = imageList.filter(image => (image.filename !== filename));

        setImageList(newImageList);
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
                                    <Button style={{ borderRadius: 100, width: 80, fontWeight: 'bold', backgroundColor: '#00aff0', color: 'white' }}>
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
                                style={{ backgroundImage: `url(${media.url})`, backgroundSize: 'cover', width: 100, height: 100, borderRadius: 6, marginRight: 10 }}
                            >
                                <IconButton><HighlightOffOutlinedIcon color="primary" style={{ marginRight: -150, marginTop: -10 }} /></IconButton>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-20">
                        <input
                            ref={fileInput}
                            accept="image/*"
                            hidden
                            type="file"
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
                <SnackBar
                    message={'Media has already added. Please choose another.'}
                />
            </Container>
        </Fragment >
    );
};

export default React.memo(PostsPage);