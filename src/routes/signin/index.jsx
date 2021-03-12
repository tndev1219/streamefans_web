import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Button, Grid, Divider, TextField, CircularProgress, InputAdornment, IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from "react-slick";
import TwitterIcon from '@material-ui/icons/Twitter';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SnackBar from '../../components/global/SnackBar';
import PhonesImg from '../../assets/images/phones.png';
import LogoImg from '../../assets/images/Logo.png';
import GoogleImg from '../../assets/images/google.jpg';
import Slide1Img from '../../assets/login_carousel/slide-1.png';
import Slide2Img from '../../assets/login_carousel/slide-2.jpg';
import Slide3Img from '../../assets/login_carousel/slide-3.jpg';
import Slide4Img from '../../assets/login_carousel/slide-4.jpg';
import Slide5Img from '../../assets/login_carousel/slide-5.jpg';

import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';
import { useAuthAction } from '../../store/slices/auth.slice';

const SignIn = (props) => {
    const history = useHistory();
    const [fields, setFiedls] = useState({});
    const [errors, setErros] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const loading = useASelector((state) => state.global.loading, []);

    const setShowSnackBar = useGlobalAction('setShowSnackBar');
    const setLoading = useGlobalAction('setLoading');
    const signupRequest = useAuthAction('signupRequest');
    const loginRequest = useAuthAction('loginRequest');

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

    const handleChange = (e) => {
        fields[e.target.name] = e.target.value;
        setFiedls(fields);
    };

    const handleClick = () => {
        if (handleValidation()) {
            setLoading(true);
            handleSubmit();
            return true;
        } else {
            setShowSnackBar({ showSnackBar: true, snackBarVariant: 'warning', snackBarMessage: 'Please input the correct value...' });
            return false;
        }
    };

    const handleValidation = () => {
        const errors = {};
        let formIsValid = true;

        // Email
        if (!fields.email) {
            formIsValid = false;
            errors.email = true;
        }

        if (typeof fields.email !== "undefined") {
            const lastAtPos = fields.email.lastIndexOf('@');
            const lastDotPos = fields.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@') === -1 && lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors.email = true;
            }
        }

        // Password
        if (!fields.password) {
            formIsValid = false;
            errors.password = true;
        }

        if (!isLoginPage) {
            if (!fields.display_name) {
                formIsValid = false;
                errors.display_name = true;
            }
        }

        setErros(errors);
        return formIsValid;
    };

    const handleSubmit = () => {
        const data = fields;

        const meta = {
            redirect: history.push,
            path: '/home',
        };

        if (!isLoginPage) {
            data.username = 'default';
            signupRequest({ data, meta });
        } else {
            data.username = data.email;
            loginRequest({ data, meta });
        }
    };

    return (
        <Fragment>
            <Container maxWidth="lg" style={{ display: 'flex', minHeight: '100vh' }}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                    <Grid item style={{ height: 700 }}>
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
                    <Grid item style={{ maxWidth: '30%' }}>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={2} >
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src={LogoImg} alt="logo" style={{ width: '100%' }} />
                                <p className="mt-20" style={{ textAlign: 'center', fontSize: 13 }}>Sign up to make money and interact with your fans!</p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%', marginTop: -20 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<TwitterIcon style={{ marginRight: 20 }} />}
                                    fullWidth={true}
                                    style={{ borderRadius: 50, fontSize: 15, fontWeight: 'bold', backgroundColor: '#1da1f2', color: 'white' }}
                                    className="p-10 pl-20 pr-20"
                                >
                                    Sign In With Twitter
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
                                    Sign In With Google
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%', marginTop: 25 }}>
                                <Grid container direction="row" justify="space-between" alignItems="center" style={{ width: '100%' }}>
                                    <Grid item style={{ width: '44%', marginTop: -20 }}>
                                        <Divider />
                                    </Grid>
                                    <Grid item style={{ fontWeight: 'bold', color: '#8a96a3', fontSize: 13 }}>
                                        <p>OR</p>
                                    </Grid>
                                    <Grid item style={{ width: '44%', marginTop: -20 }}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                <TextField
                                    label="E-mail"
                                    variant="outlined"
                                    name="email"
                                    type="email"
                                    required={true}
                                    error={errors.email}
                                    helperText={errors.email ? "The email field is required" : ""}
                                    onChange={(e) => handleChange(e)}
                                    style={{ width: '100%' }}
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required={true}
                                    error={errors.password}
                                    helperText={errors.password ? "The password field is required" : ""}
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
                                        label="Name"
                                        variant="outlined"
                                        name="display_name"
                                        required={true}
                                        error={errors.display_name}
                                        helperText={errors.display_name ? "The name field is required" : ""}
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
                                                Forgot password?
                                            </p>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ width: '100%' }}>
                                            <Button
                                                className="btn-active"
                                                onClick={handleClick}
                                                disabled={false}
                                                style={{ width: '100%', borderRadius: 50, fontWeight: 'bold', marginTop: -5, padding: 10 }}
                                            >
                                                LogIn
                                            </Button>
                                            {/* {props.wait && <CircularProgress size={24} style={{ position: "absolute", marginTop: "8px", marginLeft: "-90px" }} />} */}
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <p style={{ fontSize: 14, marginTop: 10 }}>Don`t have an account yet?</p>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <p
                                                onClick={() => setIsLoginPage(false)}
                                                style={{ fontWeight: 'bold', fontSize: 14, marginTop: -15, color: '#00aff0', cursor: 'pointer' }}
                                            >
                                                Sign up for StreaMeFans.com
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
                                                Sign Up
                                            </Button>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                                            <p style={{ fontSize: 14, marginTop: 10 }}>By signing up you agree to our</p>
                                            <p style={{ fontSize: 14, marginTop: -10 }}><span style={{ color: '#00aff0' }}>Terms of Service</span> and <span style={{ color: '#00aff0' }}>Privacy Policy</span>.</p>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <p style={{ fontSize: 14, marginTop: 10 }}>Already have an account?</p>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <p
                                                onClick={() => setIsLoginPage(true)}
                                                style={{ fontWeight: 'bold', fontSize: 14, marginTop: -15, color: '#00aff0', cursor: 'pointer' }}
                                            >
                                                Login
                                            </p>
                                        </Grid>
                                    </>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <SnackBar />
            </Container>
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>RESTORE ACCESS</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you have an StreaMeFans account, you will receive a password reset link to this e-mail.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="dense"
                        label="E-mail"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setShowModal(false)}
                        color="primary"
                        style={{ borderRadius: 50, fontWeight: 'bold' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => setShowModal(false)}
                        disabled={true}
                        color="primary"
                        style={{ borderRadius: 50, fontWeight: 'bold' }}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default React.memo(SignIn);