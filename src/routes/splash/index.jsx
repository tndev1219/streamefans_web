import React, { Fragment } from 'react';
import { useHistory } from "react-router-dom";
import { Container } from '@material-ui/core';
import LogoImg from '../../assets/images/Logo.png';

// import { useGlobalAction } from '../../store/slices/global.slice';

const Splash = (props) => {
    const history = useHistory();

    setTimeout(() => {
        history.push('/login');
    }, 6000);

    return (
        <Fragment>
            <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <img src={LogoImg} className="App-logo" alt='phones' style={{ width: '50%' }}></img>
            </Container>
        </Fragment>
    );
};

export default React.memo(Splash);