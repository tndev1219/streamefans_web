import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Slider from "react-slick";

// material ui
import {
    Container,
    Button,
    Grid,
    Divider,
    TextField,
    CircularProgress,
    InputAdornment,
    IconButton,
    Hidden,
    withWidth,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';
import { useAuthAction } from '../../store/slices/auth.slice';

// components
import Footer from "../../components/layouts/Footer";
import PhonesImg from '../../assets/images/phones.png';
import LogoImg from '../../assets/images/Logo.png';
import GoogleImg from '../../assets/images/google.jpg';
import Slide1Img from '../../assets/login_carousel/slide-1.png';
import Slide2Img from '../../assets/login_carousel/slide-2.jpg';
import Slide3Img from '../../assets/login_carousel/slide-3.jpg';
import Slide4Img from '../../assets/login_carousel/slide-4.jpg';
import Slide5Img from '../../assets/login_carousel/slide-5.jpg';

const SignIn = (props) => {
    const history = useHistory();
    const [fields, setFiedls] = useState({});
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [restoreAccessEmail, setRestoreAccessEmail] = useState('');
    const [restoreAccessEmailValid, setRestoreAccessEmailValid] = useState(true);

    const loading = useASelector((state) => state.global.loading, []);
    const language = useASelector((state) => state.global.language, []);

    const setSnackBar = useGlobalAction('setSnackBar');
    const setLoading = useGlobalAction('setLoading');
    const setAlertDialog = useGlobalAction('setAlertDialog');
    const signupRequest = useAuthAction('signupRequest');
    const loginRequest = useAuthAction('loginRequest');
    const restoreAccessRequest = useAuthAction('restoreAccessRequest');

    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // Email Validation Regex
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Password Validation Regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const passwordLengthRegex = /^.{6,}$/;

    const handleChange = (e) => {
        fields[e.target.name] = e.target.value;
        setFiedls(fields);
    };

    const handleValidation = () => {
        const errors = {};
        let formIsValid = true;

        // Email
        if (!fields.email || fields.email.length === 0) {
            formIsValid = false;
            errors.email = true;
            errors.emailHelperText = "The email field is required";
        } else {
            if (!emailRegex.test(String(fields.email).toLowerCase())) {
                formIsValid = false;
                errors.email = true;
                errors.emailHelperText = "E-mail is not valid";
            }
        }

        if (!isLoginPage) {
            // Password
            if (!fields.password || fields.password.length === 0) {
                formIsValid = false;
                errors.password = true;
                errors.passwordHelperText = "The password field is required";
            } else if (!passwordLengthRegex.test(String(fields.password))) {
                formIsValid = false;
                errors.password = true;
                errors.passwordHelperText = "The password field must be at least 6 characters";
            } else if (!passwordRegex.test(String(fields.password))) {
                formIsValid = false;
                errors.password = true;
                errors.passwordHelperText = "The password must contain at least 1 number, at least 1 lower case letter, and at least 1 upper case letter";
            }

            // Display Name
            if (!fields.display_name || fields.display_name.length === 0) {
                formIsValid = false;
                errors.display_name = true;
                errors.displayNameHelperText = "The name field is required";
            }
        } else {
            // Password
            if (!fields.password || fields.password.length === 0) {
                formIsValid = false;
                errors.password = true;
                errors.passwordHelperText = "The password field is required";
            }
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleClick = () => {
        if (handleValidation()) {
            handleSubmit();
        } else {
            setSnackBar({ snackBarState: true, snackBarVariant: 'warning', snackBarMessage: 'Please input the correct value...' });
        }
    };

    const handleSubmit = () => {
        const data = fields;
        const meta = {
            redirect: history.push,
            path: '/home',
        };

        setLoading(true);

        if (!isLoginPage) {
            data.username = 'default';
            signupRequest({ data, meta });
        } else {
            data.username = data.email;
            loginRequest({ data, meta });
        }
    };

    const restoreAccessEmailValidation = (email) => {
        return emailRegex.test(String(email).toLowerCase());
    };

    const restoreAccessEmailChange = (e) => {
        setRestoreAccessEmail(e.target.value);
        if (restoreAccessEmailValidation(e.target.value)) {
            setRestoreAccessEmailValid(false);
        } else {
            setRestoreAccessEmailValid(true);
        }
    };

    const sendRestoreAccessEmail = () => {
        const data = {
            email: restoreAccessEmail,
        };

        restoreAccessRequest({ data });
        setShowModal(false);
        setAlertDialog({ alertDialogState: true, alertDialogMessage: 'Please check your e-mail for a temporary password reset link and make sure you set a new one right after you click it.' });
    };

    return (
        <Fragment>
            <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', marginBottom: 60, marginTop: props.width === 'xs' ? 30 : 0 }}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                    <Hidden smDown>
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} style={{ height: 700, paddingLeft: 50, marginRight: -150 }}>
                            <img src={PhonesImg} alt='phones'></img>
                            <Slider {...settings} style={{ position: 'relative', top: -645, left: 112, width: 312 }}>
                                <div>
                                    <img src={Slide1Img} alt='slide-1' />
                                </div>
                                <div>
                                    <img src={Slide2Img} alt='slide-2' />
                                </div>
                                <div>
                                    <img src={Slide3Img} alt='slide-3' />
                                </div>
                                <div>
                                    <img src={Slide4Img} alt='slide-4' />
                                </div>
                                <div>
                                    <img src={Slide5Img} alt='slide-5' />
                                </div>
                            </Slider>
                        </Grid>
                    </Hidden>
                    <Grid item xs={10} sm={7} md={4} lg={4} xl={4}>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={2} >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src={LogoImg} alt="logo" style={{ width: '100%' }} />
                                <p className="mt-20" style={{ textAlign: 'center', fontSize: 13 }}>
                                    {language ?
                                        '登録してお金を稼ぎ、ファンと交流しましょう！'
                                        :
                                        'Sign up to make money and interact with your fans!'
                                    }
                                </p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%', marginTop: -20 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<TwitterIcon style={{ marginRight: 20 }} />}
                                    fullWidth={true}
                                    style={{ borderRadius: 50, fontSize: 15, fontWeight: 'bold', backgroundColor: '#1da1f2', color: 'white' }}
                                    className="p-10 pl-20 pr-20"
                                >
                                    {language ?
                                        'twitterでサインイン'
                                        :
                                        'Sign In With Twitter'
                                    }
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<img src={GoogleImg} alt="google" style={{ width: 17, borderRadius: 50, marginRight: 20 }} />}
                                    fullWidth={true}
                                    style={{ borderRadius: 50, fontSize: 15, fontWeight: 'bold', backgroundColor: '#4285f4', color: 'white' }}
                                    className="p-10 pl-20 pr-20"
                                >
                                    {language ?
                                        'googleでログインする'
                                        :
                                        'Sign In With Google'
                                    }
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%', marginTop: 25 }}>
                                <Grid container direction="row" justify="space-between" alignItems="center" style={{ width: '100%' }}>
                                    <Grid item style={{ width: '100%', marginTop: -20 }}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                <TextField
                                    label={language ? '電子メール' : 'E-mail'}
                                    variant="outlined"
                                    name="email"
                                    type="email"
                                    required={true}
                                    error={errors.email}
                                    helperText={errors.emailHelperText}
                                    onChange={(e) => handleChange(e)}
                                    style={{ width: '100%' }}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                <TextField
                                    label={language ? 'パスワード' : 'Password'}
                                    variant="outlined"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required={true}
                                    error={errors.password}
                                    helperText={errors.passwordHelperText}
                                    onChange={(e) => handleChange(e)}
                                    style={{ width: '100%' }}
                                    size="small"
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>,
                                    }}
                                />
                            </Grid>
                            {!isLoginPage &&
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                    <TextField
                                        label={language ? '名' : 'Name'}
                                        variant="outlined"
                                        name="display_name"
                                        required={true}
                                        error={errors.display_name}
                                        helperText={errors.displayNameHelperText}
                                        onChange={(e) => handleChange(e)}
                                        style={{ width: '100%' }}
                                        size="small"
                                    />
                                </Grid>
                            }
                            {
                                isLoginPage ?
                                    <>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                            <p
                                                onClick={() => setShowModal(true)}
                                                style={{ fontSize: 12, marginTop: -10, paddingLeft: 15, color: '#00aff0', cursor: 'pointer' }}
                                            >
                                                {language ?
                                                    'パスワードをお忘れですか？'
                                                    :
                                                    'Forgot password?'
                                                }
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                            <Button
                                                className="btn-active"
                                                onClick={handleClick}
                                                disabled={loading}
                                                style={{ width: '100%', borderRadius: 50, fontWeight: 'bold', marginTop: -5, padding: 10 }}
                                                endIcon={loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <></>}
                                            >
                                                {language ?
                                                    'ログイン'
                                                    :
                                                    'LogIn'
                                                }
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <p style={{ fontSize: 14, marginTop: 10 }}>
                                                {language ?
                                                    'アカウントがない方はこちらへ'
                                                    :
                                                    'Don`t have an account yet?'
                                                }
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <p
                                                onClick={() => setIsLoginPage(false)}
                                                style={{ fontWeight: 'bold', fontSize: 14, marginTop: -15, color: '#00aff0', cursor: 'pointer' }}
                                            >
                                                {language ?
                                                    'StreaMeFans.com にサインアップ'
                                                    :
                                                    'Sign up for StreaMeFans.com'
                                                }
                                            </p>
                                        </Grid>
                                    </>
                                    :
                                    <>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                            <Button
                                                className="btn-active"
                                                onClick={handleClick}
                                                disabled={loading}
                                                style={{ width: '100%', borderRadius: 50, fontWeight: 'bold', marginTop: -5, padding: 10 }}
                                                endIcon={loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <></>}
                                            >
                                                {language ?
                                                    'サインアップ'
                                                    :
                                                    'Sign Up'
                                                }
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                                            {language ?
                                                <div>
                                                    <p style={{ fontSize: 14, marginTop: 10 }}>サインアップすることにより、当社の</p>
                                                    <p style={{ fontSize: 14, marginTop: -10 }}><span style={{ color: '#00aff0' }}>利用規約</span>と<span style={{ color: '#00aff0' }}>プライバシーポリシー</span>に同意</p>
                                                </div>
                                                :
                                                <div>
                                                    <p style={{ fontSize: 14, marginTop: 10 }}>By signing up you agree to our</p>
                                                    <p style={{ fontSize: 14, marginTop: -10 }}><span style={{ color: '#00aff0' }}>Terms of Service</span> and <span style={{ color: '#00aff0' }}>Privacy Policy</span>.</p>
                                                </div>
                                            }
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <p style={{ fontSize: 14, marginTop: 10 }}>
                                                {language ?
                                                    'アカウントがある方はこちらへ'
                                                    :
                                                    'Already have an account?'
                                                }
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <p
                                                onClick={() => setIsLoginPage(true)}
                                                style={{ fontWeight: 'bold', fontSize: 14, marginTop: -15, color: '#00aff0', cursor: 'pointer' }}
                                            >
                                                {language ?
                                                    'ログイン'
                                                    :
                                                    'LogIn'
                                                }
                                            </p>
                                        </Grid>
                                    </>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Footer />
            </Container>
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>RESTORE ACCESS</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you have an StreaMeFans account, you will receive a password reset link to this e-mail.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required={true}
                        variant="outlined"
                        margin="dense"
                        name="email"
                        label="E-mail"
                        type="email"
                        fullWidth
                        value={restoreAccessEmail}
                        error={restoreAccessEmailValid}
                        onChange={restoreAccessEmailChange}
                        helperText={restoreAccessEmailValid ? "E-mail is not valid" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setShowModal(false)}
                        color="primary"
                        style={{ borderRadius: 50, fontWeight: 'bold' }}
                    >
                        {language ? 'キャンセル' : 'Cancel'}
                    </Button>
                    <Button
                        onClick={sendRestoreAccessEmail}
                        disabled={restoreAccessEmailValid}
                        color="primary"
                        style={{ borderRadius: 50, fontWeight: 'bold' }}
                    >
                        {language ? '送信' : 'Send'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

SignIn.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default React.memo(withWidth()(SignIn));