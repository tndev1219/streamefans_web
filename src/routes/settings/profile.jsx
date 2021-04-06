import React, { Fragment, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import validator from 'validator';

// material ui
import {
    Container,
    Grid,
    Button,
    Box,
    Divider,
    IconButton,
    TextField,
    InputAdornment,
    CircularProgress,
    Hidden,
} from '@material-ui/core';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';
import { useAuthAction } from '../../store/slices/auth.slice';

// component
import SettingsNav from '../../components/global/SettingsNav';

// constants
import appConfig from '../../constants/AppConfig';



const ProfilePage = (props) => {
    const history = useHistory();
    const headerImageInputRef = useRef();
    const avatarImageInputRef = useRef();

    const language = useASelector((state) => state.global.language, []);
    const loading = useASelector((state) => state.global.loading, []);
    const profile = useASelector((state) => state.auth.profile, []);

    const subscriptionTabLabels = [
        {
            id: 0,
            label: language ? 'サブスクリプション価格とバンドル' : 'Subscription price and bundles',
            path: '/settings/subscription',
        },
        {
            id: 1,
            label: language ? 'ファンとフォローする' : 'Fans and following',
            path: '/settings/fans',
        },
    ];

    const securityTabLabels = [
        {
            id: 2,
            label: language ? 'プライバシーと安全性' : 'Privacy and safety',
            path: '/settings/security',
        },
    ];

    const [hoveredTab, setHoveredTab] = useState(null);
    const [fields, setFiedls] = useState({
        username: profile.username,
        display_name: profile.display_name,
        bio: profile.bio ? profile.bio : '',
        location: profile.location ? profile.location : '',
        website: profile.website ? profile.website : '',
    });
    const [errors, setErrors] = useState({
        username: false,
        display_name: false,
        website: false,
    });
    const [newAvatarImage, setNewAvatarImage] = useState(null);
    const [newHeaderImage, setNewHeaderImage] = useState(null);

    const setSnackBar = useGlobalAction('setSnackBar');
    const setLoading = useGlobalAction('setLoading');
    const updateProfile = useAuthAction('updateProfile');
    const uploadImage = useAuthAction('uploadImage');
    const removeImage = useAuthAction('removeImage');

    const handleMouseEnter = (index) => {
        setHoveredTab(index);
    };

    const handleMouseLeave = (index) => {
        setHoveredTab(null);
    };

    const handleChange = (e) => {
        if (e.target.name === 'username') {
            fields[e.target.name] = e.target.value.trim();
        } else {
            fields[e.target.name] = e.target.value;
        }
        setFiedls(fields);
    };

    const handleValidation = () => {
        const errors = {};
        let formIsValid = true;

        if (validator.isEmpty(fields.username)) {
            formIsValid = false;
            errors.username = true;
        }

        if (validator.isEmpty(fields.display_name)) {
            formIsValid = false;
            errors.display_name = true;
        }

        if (fields.website && fields.website.length !== 0) {
            if (!validator.isURL(fields.website)) {
                formIsValid = false;
                errors.website = true;
            }
        }

        setErrors(errors);
        return formIsValid;
    };

    const saveBtnClick = () => {
        if (handleValidation()) {

            setLoading(true);
            const data = fields;
            data.id = profile.id;
            updateProfile({ data });

            if (newAvatarImage || newHeaderImage) {
                const data = new FormData();
                if (newAvatarImage) { data.append('avatar', newAvatarImage.file); }
                if (newHeaderImage) { data.append('header_image', newHeaderImage.file); }

                uploadImage({ data, id: profile.id });
            }
        } else {
            setSnackBar({ snackBarState: true, snackBarVariant: 'warning', snackBarMessage: 'Please input the correct value...' });
        }
    };

    const handleUploadChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) { return; }

        if (type === 'headerImage') {
            if (newHeaderImage && newHeaderImage.filename === file.name) {
                setSnackBar({ snackBarState: true, snackBarVariant: 'warning', snackBarMessage: 'Media has already added. Please choose another.' });
            } else {
                setNewHeaderImage({
                    url: URL.createObjectURL(file),
                    type: 'image',
                    filename: file.name,
                    file,
                });
            }
        } else if (type === 'avatarImage') {
            if (newAvatarImage && newAvatarImage.filename === file.name) {
                setSnackBar({ snackBarState: true, snackBarVariant: 'warning', snackBarMessage: 'Media has already added. Please choose another.' });
            } else {
                setNewAvatarImage({
                    url: URL.createObjectURL(file),
                    type: 'image',
                    filename: file.name,
                    file,
                });
            }
        }
    };

    const deleteImage = (type) => {
        if (type === 'headerImage') {
            if (newHeaderImage) {
                headerImageInputRef.current.value = null;
                setNewHeaderImage(null);
            } else {
                setLoading(true);

                const data = {
                    type: 'header_image',
                };

                removeImage({ data });
            }
        } else if (type === 'avatarImage') {
            if (newAvatarImage) {
                avatarImageInputRef.current.value = null;
                setNewAvatarImage(null);
            } else {
                setLoading(true);

                const data = {
                    type: 'avatar',
                };

                removeImage({ data });
            }
        }
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Grid container direction="row" justify="center">
                    <Hidden smDown>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ borderLeft: '1px solid #eee', minHeight: '100vh' }}>
                            <SettingsNav index={0} />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={10} md={8} lg={8} xl={8} style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, height: 48, paddingRight: 15, paddingLeft: 15 }}>
                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Hidden mdUp>
                                    <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                        <ArrowBackRoundedIcon />
                                    </IconButton>
                                </Hidden>
                                <span style={{ fontWeight: 500, fontSize: 19 }}>{language ? "プロファイルの編集" : "EDIT PROFILE"}</span>
                            </Box>
                            <Button
                                disabled={loading}
                                endIcon={loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <></>}
                                style={{ borderRadius: 100, width: 80, backgroundColor: '#00aff0', color: 'white', fontWeight: 'bold' }}
                                onClick={saveBtnClick}
                            >
                                {language ? '保管' : 'SAVE'}
                            </Button>
                        </Box>
                        <Divider />
                        <Box
                            style={{
                                backgroundImage: newHeaderImage ? `url("${newHeaderImage.url}")` : `url("${appConfig.URL}${profile.header_image}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: 220,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <input
                                ref={headerImageInputRef}
                                accept="image/*"
                                hidden
                                type="file"
                                onChange={(e) => handleUploadChange(e, 'headerImage')}
                            />
                            <IconButton onClick={() => headerImageInputRef.current.click()} >
                                <CameraAltOutlinedIcon style={{ color: 'white' }} />
                            </IconButton>
                            {(!profile.header_image.includes('header_image/default_header_image.png') || newHeaderImage) &&
                                <IconButton onClick={() => deleteImage('headerImage')} >
                                    <CloseRoundedIcon style={{ color: 'white' }} />
                                </IconButton>
                            }
                        </Box>
                        <Box
                            style={{
                                backgroundImage: newAvatarImage ? `url(${newAvatarImage.url})` : `url(${appConfig.URL}${profile.avatar})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: 100,
                                height: 100,
                                border: '2px solid white',
                                borderRadius: 100,
                                marginTop: -50,
                                marginLeft: 20,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <input
                                ref={avatarImageInputRef}
                                accept="image/*"
                                hidden
                                type="file"
                                onChange={(e) => handleUploadChange(e, 'avatarImage')}
                            />
                            <IconButton onClick={() => avatarImageInputRef.current.click()} >
                                <CameraAltOutlinedIcon style={{ color: 'white' }} />
                            </IconButton>
                            {(!profile.avatar.includes('avatar/default_avatar.png') || newAvatarImage) &&
                                <IconButton onClick={() => deleteImage('avatarImage')} >
                                    <CloseRoundedIcon style={{ color: 'white' }} />
                                </IconButton>
                            }
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                            <Box style={{ width: '95%' }}>
                                <TextField
                                    label={language ? "ユーザ名" : "Username"}
                                    variant="outlined"
                                    name="username"
                                    defaultValue={profile.username}
                                    error={errors.username}
                                    fullWidth
                                    className="mt-20"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">@</InputAdornment>,
                                    }}
                                    helperText={errors.username ? "This field is required" : `https://streamefans.com/${profile.username}`}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label={language ? "表示名" : "Display name"}
                                    variant="outlined"
                                    name="display_name"
                                    defaultValue={profile.display_name}
                                    error={errors.display_name}
                                    fullWidth
                                    className="mt-20"
                                    helperText={errors.display_name ? "this field is required" : ""}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label={language ? "バイオ" : "Bio"}
                                    variant="outlined"
                                    name="bio"
                                    defaultValue={profile.bio}
                                    fullWidth
                                    multiline
                                    rows={2}
                                    className="mt-20"
                                    onChange={handleChange}
                                />
                                <TextField
                                    label={language ? "ロケーション" : "Location"}
                                    variant="outlined"
                                    name="location"
                                    defaultValue={profile.location}
                                    fullWidth
                                    className="mt-20"
                                    onChange={handleChange}
                                />
                                <TextField
                                    label={language ? "ウェブサイトのURL" : "Website URL"}
                                    variant="outlined"
                                    name="website"
                                    defaultValue={profile.website}
                                    error={errors.website}
                                    fullWidth
                                    className="mt-20"
                                    helperText={errors.website ? "The Website URL field is not valid URL" : ""}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>
                        <Box style={{ height: 10, backgroundColor: '#eee', marginTop: 20, borderTop: '1px solid #ddd' }}></Box>
                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>{language ? "サブスクリプション" : "Subscription"}</Box>
                        <Divider />
                        {subscriptionTabLabels.map((item) => (
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
                        <Box style={{ height: 10, backgroundColor: '#eee' }}></Box>
                        <Box style={{ height: 40, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 5, paddingLeft: 10, fontWeight: 'bold' }}>{language ? "関連設定" : "Related settings"}</Box>
                        <Divider></Divider>
                        {securityTabLabels.map((item) => (
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

export default React.memo(ProfilePage);