import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, AppBar, IconButton, Button, Box, Tooltip, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
// component

const BankingPage = (props) => {
    const history = useHistory();
    const [check, setChecked] = useState(false);
    const [fields, setFiedls] = useState({});
    const [errors, setErros] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [type, setType] = useState('');

    const handleChange = (e) => {
        fields[e.target.name] = e.target.value;
        setFiedls(fields);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
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

        setErros(errors);
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
                                    <span style={{ fontWeight: 500, fontSize: 19 }}>BANKING</span>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Billing Support" placement="top">
                                        <IconButton onClick={() => history.push('/banking/support')}>
                                            <ContactSupportOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="row" justify="space-between" className="mt-0">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <p style={{ fontSize: 15, color: '#8a96a3', fontWeight: 'bold', marginBottom: 15 }}>PERSONAL INFORMATION</p>
                        <p style={{ fontSize: 15 }}>Fill in your legal name, address and attach your government issued picture ID..</p>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            name="firstname"
                            required={true}
                            error={errors.firstname}
                            helperText={errors.firstname ? "The First Name field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            name="lastname"
                            required={true}
                            error={errors.lastname}
                            helperText={errors.lastname ? "The Last Name field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <TextField
                            label="Country"
                            variant="outlined"
                            name="country"
                            value="Japan"
                            disabled
                            required={true}
                            error={errors.country}
                            helperText={errors.country ? "The country field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <p style={{ fontSize: 12, color: 'rgba(138,150,163,.75)', marginBottom: 0, marginLeft: 15, marginTop: 5 }}>If you would like to change your country please contact customer support</p>
                        <TextField
                            label="Address"
                            variant="outlined"
                            name="address"
                            required={true}
                            error={errors.address}
                            helperText={errors.address ? "The address field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <TextField
                            label="City"
                            variant="outlined"
                            name="city"
                            required={true}
                            error={errors.city}
                            helperText={errors.city ? "The city field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <TextField
                            label="State / Province"
                            variant="outlined"
                            name="state"
                            required={true}
                            error={errors.state}
                            helperText={errors.state ? "The state field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <TextField
                            label="Postal / Zip"
                            variant="outlined"
                            name="zip"
                            required={true}
                            error={errors.zip}
                            helperText={errors.zip ? "The zip field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar={false}
                                margin="normal"
                                label="Date of birth"
                                format="dd.MM.yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                inputVariant="outlined"
                                style={{ width: '100%' }}
                            />
                        </MuiPickersUtilsProvider>
                        <FormControl variant="outlined" style={{ width: '100%' }} className="mt-20">
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">Document type</InputLabel>
                            <Select
                                labelId="demo-simple-select-placeholder-label-label"
                                id="demo-simple-select-placeholder-label"
                                value={type}
                                onChange={handleTypeChange}
                                displayEmpty
                                label="Document type"
                            >
                                <MenuItem value="">-- Choose --</MenuItem>
                                <MenuItem value={10}>Passport</MenuItem>
                                <MenuItem value={20}>ID Card</MenuItem>
                            </Select>
                        </FormControl>
                        <Grid container direction="row" justify="space-between" alignItems="center" spacing={5} style={{ marginTop: -10 }}>
                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                <p style={{ fontSize: 13, color: '#8a96a3', marginBottom: 10 }}>
                                    PHOTO OF YOUR ID&nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Your ID documents will be automatically rejected if they do not meet the required standards. Any document uploaded that does not clearly show all information, whether that is due to a blurry photo, the information being covered or hidden, or glare being present in the image, then the ID will not be eligible for approval. Any ID uploaded must also be in full colour, with all four corners of the ID being clearly visible in the scan/photo." placement="top">
                                        <InfoOutlinedIcon style={{ fontSize: 15, marginBottom: 2 }} />
                                    </Tooltip>
                                </p>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={handleClick}
                                    style={{ borderRadius: 100, fontWeight: 'bold' }}
                                >
                                    SELECT FILE
                                </Button>
                                <p style={{ fontSize: 12, color: 'rgba(138,150,163,.75)', marginBottom: 0, marginLeft: 15, marginTop: 5 }}>Please upload a photo of your picture ID Document (i.e. Passport)</p>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Box
                                    style={{
                                        backgroundImage: `url("https://static.cdn.onlyfans.com/theme/onlyfans/spa/img/photo_id_rules_id.jpg")`,
                                        backgroundPosition: 'center center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        width: '100%',
                                        height: 105,
                                    }}
                                ></Box>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="space-between" alignItems="center" spacing={5} style={{ marginTop: -30 }}>
                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                <p style={{ fontSize: 13, color: '#8a96a3', marginBottom: 10 }}>
                                    PHOTO OF HOLDING YOUR ID&nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Your ID documents will be automatically rejected if they do not meet the required standards. Any document uploaded that does not clearly show all information, whether that is due to a blurry photo, the information being covered or hidden, or glare being present in the image, then the ID will not be eligible for approval. Any ID uploaded must also be in full colour, with all four corners of the ID being clearly visible in the scan/photo." placement="top">
                                        <InfoOutlinedIcon style={{ fontSize: 15, marginBottom: 2 }} />
                                    </Tooltip>
                                </p>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={handleClick}
                                    style={{ borderRadius: 100, fontWeight: 'bold' }}
                                >
                                    SELECT FILE
                                </Button>
                                <p style={{ fontSize: 12, color: 'rgba(138,150,163,.75)', marginBottom: 0, marginLeft: 15, marginTop: 5 }}>Please upload a photo holding your ID (i.e. a selfie, ensuring your face is clearly visible)</p>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Box
                                    style={{
                                        backgroundImage: `url("https://static.cdn.onlyfans.com/theme/onlyfans/spa/img/photo_id_rules_selfie.jpg")`,
                                        backgroundPosition: 'center center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        width: '100%',
                                        height: 105,
                                    }}
                                ></Box>
                            </Grid>
                        </Grid>
                        <p style={{ fontSize: 13, color: '#8a96a3', fontWeight: 500, marginBottom: 0, marginTop: 10 }}>RELEASE FORMS</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar={false}
                                margin="normal"
                                label="ID expiration date"
                                format="dd.MM.yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                                inputVariant="outlined"
                                style={{ width: '100%' }}
                            />
                        </MuiPickersUtilsProvider>
                        <FormControlLabel
                            control={<Checkbox checked={check} color="primary" onChange={() => setChecked(!check)} name="checkedA" required />}
                            label="No expiration date"
                            className="mt-20"
                        />
                        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleClick}
                                style={{ borderRadius: 100, fontWeight: 'bold', marginTop: 20, width: 200, color: 'white', marginRight: 10 }}
                            >
                                SEND FOR APPROVAL
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    );
};

export default React.memo(BankingPage);