import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Grid, AppBar, IconButton, Button, Box, Dialog, DialogContent, DialogContentText, DialogActions, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { countries } from '../../assets/data/Countries';
// component

const AddCardPage = (props) => {
    const history = useHistory();
    const [check, setChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fields, setFiedls] = useState({});
    const [errors, setErros] = useState({});

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

    const countryToFlag = (isoCode) => {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode
                .toUpperCase()
                .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
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
                                    <span style={{ fontWeight: 500, fontSize: 19 }}>ADD CARD</span>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => setShowModal(true)}
                                        style={{ borderRadius: 100, width: 80, backgroundColor: '#00aff0', color: 'white' }}
                                    >
                                        Verify
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="row" justify="space-between" spacing={5} className="mt-0">
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <p style={{ fontSize: 15, color: '#8a96a3', fontWeight: 'bold' }}>BILLING DETAILS</p>
                        <p style={{ fontSize: 15 }}>We are fully compliant with Payment Card Industry Data Security Standards.</p>
                        <TextField
                            label="Street"
                            variant="outlined"
                            name="street"
                            required={true}
                            error={errors.street}
                            helperText={errors.street ? "The street field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
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
                            label="ZIP / Postal Code"
                            variant="outlined"
                            name="zip"
                            required={true}
                            error={errors.zip}
                            helperText={errors.zip ? "The zip field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <Autocomplete
                            id="country-select-demo"
                            className="mt-20"
                            style={{ width: '100%' }}
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(option) => (
                                <React.Fragment>
                                    <span>{countryToFlag(option.code)}&nbsp;&nbsp;</span>
                                    {option.label}
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Country"
                                    variant="outlined"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <p style={{ fontSize: 15, color: '#8a96a3', fontWeight: 'bold' }}>CARD DETAILS</p>
                        <TextField
                            label="E-mail"
                            variant="outlined"
                            name="email"
                            required={true}
                            error={errors.email}
                            helperText={errors.email ? "The email field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%', marginTop: 35 }}
                        />
                        <TextField
                            label="Name on the card"
                            variant="outlined"
                            name="name"
                            required={true}
                            error={errors.name}
                            helperText={errors.name ? "The name field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <TextField
                            label="Card Number"
                            variant="outlined"
                            name="number"
                            required={true}
                            error={errors.number}
                            helperText={errors.number ? "The number field is required" : ""}
                            onChange={(e) => handleChange(e)}
                            style={{ width: '100%' }}
                            className="mt-20"
                        />
                        <p style={{ fontSize: 13, color: '#8a96a3', fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>EXPIRATION</p>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TextField
                                label="MM"
                                variant="outlined"
                                name="month"
                                required={true}
                                error={errors.month}
                                helperText={errors.month ? "The month field is required" : ""}
                                onChange={(e) => handleChange(e)}
                                style={{ width: '30%' }}
                            />
                            <TextField
                                label="YYYY"
                                variant="outlined"
                                name="year"
                                required={true}
                                error={errors.year}
                                helperText={errors.year ? "The year field is required" : ""}
                                onChange={(e) => handleChange(e)}
                                style={{ width: '30%' }}
                            />
                            <TextField
                                label="CVC"
                                variant="outlined"
                                name="cvc"
                                required={true}
                                error={errors.cvc}
                                helperText={errors.cvc ? "The cvc field is required" : ""}
                                onChange={(e) => handleChange(e)}
                                style={{ width: '30%' }}
                            />
                        </Box>
                        <FormControlLabel
                            control={<Checkbox checked={check} color="primary" onChange={() => setChecked(!check)} name="checkedA" required />}
                            label="Tick here to confirm that you are at least 18 years old and the age of majority in your place of residence"
                            className="mt-20"
                        />
                        <Box style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled
                                onClick={handleClick}
                                style={{ borderRadius: 100, fontWeight: 'bold', marginTop: 20, width: 100, color: 'white', marginRight: 10 }}
                            >
                                SUBMIT
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box style={{ backgroundColor: 'rgba(138,150,163,.12)', color: '#8a96a3', height: 30, padding: 10, display: 'flex', alignItems: 'center', borderRadius: 5 }}>
                            OnlyFans will make a one-time charge of $0.10 when adding your payment card. The charges on your credit card statement will appear as &quot;OnlyFans&quot;.
                        </Box>
                        <Box className="mt-20" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img style={{ width: 48, height: 48 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAflBMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/UAUJi1yt72pQB5ocYdZKM8eK8OWp3E1OPU3+nj6e9ajbumwNiXttItbqlLgrWIq8xpl8DzuUD2sijy7ubz6db01JEPVY7vpQvz37jz26i/uJQuYHv0zHpNa2j1wluKhVGrkT+giTrElyrUnSDuLh2LAAAABXRSTlMA8KAgMC4oWXgAAAIfSURBVGje7ZjZcuMgEEXHTgAjIdBiy1lnX///BwfTi6h5mU6VqUoqfV4ssOjb3G5ZLj4oiqIoivKauNnvzFXZ7W/q+LcQ/roSt1X+EP/aCtse9qYJexbYmSbsWMA0QgVUQAVUoLHA4DLx5QJ3B+L7PcxEe6HDT1/m3NECwRtgDZfhItjB/SNpPOJSDOzK5ynPpN4yPdzkcZhEFn08F4EzjAKsxBgux1/sBu6gw6GT1SB+e84Cd+V6LgtHY8CVPDPaihluYj1hkZen31nhwWTAjiHPQSlMxFDRJOc7SLlnxwQC6Puvw+ETlBjX0cVULlZT4SwRRAIQ5OfhK1QPjBjIghN01WAQMg23KhHAdP+cqXodaIKSI7sTlwxCB7hBIgAV/fJMYT1vxVUdE0hiLUlAF4wiAfThxwMsCslUTWQg1c2nVMYnSGERCaDjT58j9Sg1EXy5cE0jJWMTepckAuTDCmuj2ZoImMmmI9060i1OIsCN0VFUbiL2EH3iMjnnunIhFJgsM23jqTaxQA8Z0wsFkgXId09dzhbAFkiICUKBLbFTNbwY3a0uZR2Y6MHLmkEo4CmjtBV9oceMmaL9l1kiwB7zk0M9M9uakX9KosssMCcQAI+5Rylxv20MxylUvuOjJhUY66aYqYmmI1dzjNXbokrjPwKS1/3k5+p9/1b/tqiACqjA+xNodZzT/ECq+ZFa60PB5seaiqIoiqK8Iv4CS79siHvGtFUAAAAASUVORK5CYII=" alt="Visa" />
                            <img style={{ width: 48, height: 48 }} src="data:image/png;base64,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" alt="MasterCard"></img>
                            <img style={{ width: 48, height: 48 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAABs1BMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/XkBSAAl9n///85cqvBzNuDmrh5xecCfr7nQFXi7fQtqd/ut8DrfIrlEy3A4PC13O88ruCsEDSm1uxaueMOndvvxs1kf6XT5/Hh5+7x5Oiyv9LpXm/qUGPpMknE4vCAy+yitMqTpsHnIjpgvebB1eQeo90AkdIBisxzjK4sYpzsipcFSIb68fSIy+nR2eRxud3w1doOjsztmaUDXp3uY3TrRFjICyqQ0e2X0Oppv+WhzORAseOgudGBsM/sxM0dhcJwmr8tfLREd6QDZKMraKFEZZLqb4CDQmyTPGS+PVusKU67IEKXFDrJGDa6DS/w9/vg8fmg2PHm5eyx1+v84eTc2OGBuNhVq9bBv89RoMwBhMVYkb0CdLTuqLJjh62ShqPwk580bZ5Ga54EVJPygpAkU4lkV4huXYTwc4J4VH3TYnimU3IiPHKlQmLcECyBv9+Rwd360dbdx9Lkxc9Bns4hk8z4wciCosH3srrQqblShLaek61kg6jGi591fJ/WiJpWYJM1WYkTQn0xSXxWSXYvOm/iUGRjL1x1HEfNJ0SkIkTEC/uTAAAABXRSTlMA8KAgMC4oWXgAAAO5SURBVGje7ZgHU9swFIBbWksPG3AmGSSEDGaAJFA2ZXcBLZTSvfeGAt177/WT++ykmAu2nwn1HXf1d4k8lLzPT44iS9scHBwcHBwcthI7yrYL/5TtZTvWxt9JhC9JsXPN9dsQHw1aDmWCLZStCmxJAFNYFQg28T8I5GBFqBoZ7vQXV3Vf9iSqEE+2plSBPOTiGuHQGkcsm2Qa3nhNCQK5IsyLSAcL4eOsmCr3RgXBMNehOopVWS/TIRHbkCDE9QkHYwmmj7fGukB2cSN6fjFDemkBHf8wY5SBFlRzQw7Ozs7eNza4LQkquDk3jAXemAWBnxuyp1zFpJkSFgQuY8ERRuImBUPckI+MpokUuDhNj9l9JgQpboVDxoI4IRg2+YkySxCCQgu1nfT5fM38mQ8Z1b/FMxMT/UQb6Ql4nj5A6lslQNCZTuM5/IFe3Fuu8nqGMawbYH9JDjSxAh4TgdYJ9quCAwIgPVFAdnN+VlZO8vAIIPfqlOIxdC90TH/owP3nSa0r0IJ2VXAFEB/KFJrPF7ZjoLCyC4uDAiDnQOVUYWgwFQS5yoUGABHO1EItXvqN/ZM3IwAPcH8Mt2dEgBefV34CnF76Afg5Jf7VL1g7QAm0/6FLIrTgCwBFza6Ro4DsVbJpEWAc2+bYmPcuwDWGxem5RoBXbE4CuGU9gwMAD0UAaEHBWQGgFq+vHfJ0fcIDePkeoF+50QsB/GCCDTZiqQmoe3Ad4yiC89jQ+M19fXgwhUnkcrk+fikXEdTTA/OYTHJOVK79t4C7lEDryG8BnooAMmYSxSDHx3F7G+Do7vqTx5qP12PbdWD1o0PoZ4F2PLp2AuCJ1pWpftCGl6f0gS7MZCQCKv6+fBvJKETeNWCxCDDB2DJqkBPfTzWR/aAwmlVGpC4+JY2Hb0vSaC4iNlyJSKOtN6caxTrpYkQSRWlpcLlBfPNVkrAzz39rF8W6q0dYv5We3KlmUFnZyvPvCxyLNjyhDDeZzGR5+WQmk7nD2GAgwObxrRAIBAZZAa9gLohyQ/YxAuLflB7xD1sRuCmBn9MsMkOqBEqAKVDsIRIgBKnN3IVpK89FncaGO9SQHzMR0E+++UHHZDzG519CQBpQQcQnBKQhPEPEJwTU82k6JUwzfZLE/KCIlIvrMCxjlbuJ6eDZ8CRwKM2LCEULVb3rFPHuUqaxwVBYi+7qjAoal+PeNY2T7S55Ip4KVqj45XVVNb0ehaw7tpVn+pvE9uUc2xekbF9Ss3tR0PZlTQcHBwcHB4ctxB898MbEAWVUCwAAAABJRU5ErkJggg==" alt="Maestro"></img>
                            <img style={{ width: 48, height: 48 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAflBMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/X///8AZKcdHRuHiIg9iLtSUlG9vb7B2enl5ufKy8yioqMPba1EREPX2NpsbWwqKiji6/Jencc3NzbT4u2AstN6enpfX18uf7awsbKUlZWyz+Ogxd4fdrJposlOk8KTvdl5q85wqM6ItNOmxt35C/EaAAAABXRSTlMA8KAgMC4oWXgAAALgSURBVGje7NLBjoMgEIDhxXacZBIOXCCYmKhdavv+L7gBJwV3s70wJD3wH9R44JORr16v1+v1ep/UZVAgmhou5fpXBeKpa/H9Chqk8h4GaNLwAhQ0Sb0AaFQHZAH/cJS7P60ssBDOe9B6nQg55+UAT+jsyMFkmLhZIUCb2Y9F4FiYtQigjRt/tbJgtADg4/r/CrYeoA14MnxN7SxQNbCgHmN6O+5mOpyNhWctQMQzYQjRnYY0VwIel7icxwxg2gMYFnQdEMwYoxJAGx++GbjXATfiDZTAHh8mBqgOoLxYBhKqGZgrgTRwdwawBLABYCSBdCjDmxFtEj/ZnoEg+JMDwp9jaqA8po86wOKatmAycLwB5HwdAD/tmO2K4yAUhn+97GsVtX507Ookw7SU2fu/wdWmXZcOhDBtoT/yEMgxAZ/kSNSct2mq2G8vgvYVzGdouaDPFc2wmQSf52afKT7uFeBQU35LH4ED7hbs3t+/G/4tmvihYN7Q+9/dJeiGbc1/Z3fduhx3j9oXnX5tPq7d76+Pv/164MZr/7bdbn5Xjtel8vO0e/De9M/puLly+OrrmB5volmBEo3Ro5IN5tC2SJkHT2LCRy54A8ugVGDW0HJWYFLxgI2qEBfKEoGiADBQYh4dCxpCCeKCWC5AoMUsmX4S6Z8JFIOIwhdnEzOMc8w6yCEOIUaHiou9WyMTBpmMoE2UepEAlJbCx2RNJNyIQuWiDAOVOXdN1wXIBCxVFSBQLBIYFtRIyPMTUlaMSBo1VGg4dkE7oDiNRpKLBJa2C9SU79aAjZTTIA1oaH8jyIsEOjn8L7DtWmt4rwMVasCkz1Z1IyhhVqALJTA456GZEZxGpk/R2mRaQxWMNNM7Og+oaDL1yHqfg2CAiX5WYGUjDwDqWdTQtPQ7OmVb4IOMAmd8SC7kod3XkmVMYSzRFfOy/8mvLXhWOefpBamnl9SeXRR8ellzZWVlZWVl5YX4C5gdgWt5A25PAAAAAElFTkSuQmCC" alt="Diners Club"></img>
                            <img style={{ width: 48, height: 48 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAt1BMVEUAAADy8/Xy8/Xy8/XvfQDy8/XvfQDvfQDy8/XvfQAFFx1ATVK3vL97hYnU19oiMjcTJCrj5efvgwzxmz3y5NaZoKTxqVpsd3tdaW3FysyKkpbxlC2orrHxzqjy7Obx1bjxv4n1sWlOW2DyokoxQEXx3cf93b75x5HxuXvznkLvihnxx5n1tG3ymDb+69v70KX6y5v4wIb3tnL0pVDwjyT3uXj1rV794cf71rHxyqCLi4ttbWxPT0477VJIAAAACHRSTlMA8KAg8DAloJds1qoAAAK0SURBVGje7ZjpcuIwDIALvWTZScgBISSEhPsspdBrd9//uVaKt9cfjk4925n6GxI0YOtzpCQ/fGaxWCwWi+U7cV6vwZdSq5+/z39Zgy+ndvlu/Qbyk+HtGupghPqroAZGqL0KwBBWYAVWYAU/VZAowtdRAuB2nMwHJnMcBcyomBYjAF8pFxj6ThTj+tX5gEAi03c5ktBEoqEoi4cMQBSKYD4PwpHfwD4QNCTTkxyFjPT//N4raEhOmrCAkuAQMQGeOpQNhDwIduFgEKbzUYzoVxM8PqSUTUXZaSHtX85egQToYDVLKhoNbgbgVZfhtyEU6XZ5f79spTMXsQNQnSVySl5GtUKAQwI2ZFowVLoMTWAisdveTdbryf12N+K1Q4wN/4MgPkrgU0U5ovqgl4HzMqkrVuXk6fHxaVKuCtIqaGD7pXFK0eFwaw4L4J/Ap/EUOjiEiiII727HNzfj27vZlArXJknyTsB47kGBrixHujwNh/vJ9IJw+SJ4BvpZD3orkcfXeoSgj+hylOkbN0GMgb15kD5s1uPxevOwimgZRPODgD7xIcFQNSUNY1WTHoi2vqOwr1QbYTqflZvJZLMcTAGA/9OT2vyIcZNjxOyAgNGdkx2s6IA/1BFAazdrleXDbKmXrJf+9qCBT0Vy9wliSfRVFcXQ8bgDANRtijzSwiJMV6vtM1R46OpJTDORkqRSOie97HzYg5v817dplJoVdANhUpAPhDApKAJhUtBLhTAoiKg6BgVRSwiDAk5vUMDpDQp6oRAGBYtUCHOCqAyEMCfo8n1pTBCVcyGMCfIFN9aYoMt3pSEBZ6e+GhPo7IYEOWc/jk9s54yKUBzNxYkbUvmiNRencH3Cllq0aKXiRC6ujtsUjLrTkIt+ev6925p5jyimg1B8jovrqzOLxWKxWCzfiL+k+7sJxfeL/QAAAABJRU5ErkJggg==" alt="Discover"></img>
                            <img style={{ width: 48, height: 48 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAk1BMVEUAAADy8/Xy8/Xy8/Xy8/Xy8/UAabPiBhMAlUDqfIS128h5rtTuuLzj7eq10OQOm0vj6vHx5OcOcbfri5LkIy55xJotpmHvxsomf77tqa7smqDU5uJanMyX0LHpbXUdoFbE2enE4dM8i8Npvo9GsHTlMj3jFCCXv9zw1dmItthLlMem1rxauIPoXmemyOCIyqbmQUvdb74oAAAABXRSTlMA8KAgMC4oWXgAAAGqSURBVGje7djZcoIwFIDhQj0sZV9EQBT33bbv/3QNsRNJxotqkhk7nv+Kq3wQ8cyQNwzDMAzDnql30wClGeZ7f/2BAcozBr37N0BDxvUZTNCSyQADtGQwADSFgCZg5PsJ7FQAcZNaLCD53zbLBYBg2Dqs+4EZWZ4DzjaNAUHhOBJAnFo8kNkCUDhSQGPxQLIRgIkjB5QCUNkCsJIELAFwRaDVDTgIIPBXoAlJhw7Ip9UISH49zQnw8dtxuIpkAA9IngWZm7BZCj4Bes0jBQAto/NindUXwCFNgLRUAnDzjgGFSiDnAfYEgaot4t4iVvAVOZqAISkgwkTmCfY9YH1ji9px9xo9DqQxkBYXYLQRgK4OgOJ+YNaU3fp7em1ZQKvoz5xP6yuwAtI4ugdgjcOQ3n+YEiDLoGt3648WFA9s0cL7pMuH24NF6o+KymWjouu4LJ562CHwMkCqG1iIQC0AkSSwFYFEAE5yQAkC4AIPRIEUUMYCcAYeiOYgAZReDBywroED2lOg6CPQT9jlf/6MfU1A13GO9gMp7Udqug8FtR9rYhiGYRj2RP0ACZl2oREkVCkAAAAASUVORK5CYII=" alt="JCB"></img>
                        </Box>
                        <Box className="mt-20" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13, fontWeight: 400, color: '#8a96a3' }}>
                            Fenix International Limited, Fourth Floor Imperial House, 8 Kean street, London WC2B 4AS, United Kingdom
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogContent>
                    <DialogContentText>
                        You will now be redirected to a certified document verification service Ondato.com to complete your Identity Verification
                    </DialogContentText>
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
                        color="primary"
                        style={{ borderRadius: 50, fontWeight: 'bold' }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
};

export default React.memo(AddCardPage);