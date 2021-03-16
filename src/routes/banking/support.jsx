import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, AppBar, IconButton, Button, Box, TextField } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
// component

const BillingSupportPage = (props) => {
    const history = useHistory();
    const [fields, setFiedls] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        fields[e.target.name] = e.target.value;
        setFiedls(fields);
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

        setErrors(errors);
        return formIsValid;
    };

    const handleClick = () => {
        if (handleValidation()) {
            return true;
        } else {
            return false;
        }
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
                                    <span style={{ fontWeight: 500, fontSize: 19 }}>BILLING SUPPORT</span>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="row" justify="space-around" spacing={5} className="mt-0">
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <p style={{ fontSize: 15 }}>If you have any questions, please fill out the form below to contact us.</p>
                        <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <TextField
                                label="Enter your name"
                                variant="outlined"
                                name="name"
                                value="makiyoshikawa"
                                required={true}
                                error={errors.name}
                                helperText={errors.name ? "The name field is required" : ""}
                                onChange={(e) => handleChange(e)}
                                style={{ width: '48%' }}
                            />
                            <TextField
                                label="Enter your e-mail"
                                variant="outlined"
                                name="email"
                                value="makikikiki8@gmail.com"
                                required={true}
                                error={errors.email}
                                helperText={errors.email ? "The email field is required" : ""}
                                onChange={(e) => handleChange(e)}
                                style={{ width: '48%' }}
                            />
                        </Box>
                        <TextField
                            variant="outlined"
                            name="state"
                            value="Billing support request"
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <TextField
                            label="Enter your message"
                            variant="outlined"
                            name="message"
                            required={true}
                            multiline
                            rows={4}
                            error={errors.message}
                            helperText={errors.message ? "The message field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleClick}
                                style={{ borderRadius: 100, fontWeight: 'bold', marginTop: 20, width: 100, color: 'white', marginRight: 10 }}
                            >
                                SEND
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box className="mt-20" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13, fontWeight: 400, color: '#8a96a3' }}>
                            Fenix International Limited 85, First Floor, Great Portland Street, London W1W 7LT
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(BillingSupportPage);