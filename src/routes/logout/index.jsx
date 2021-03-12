/**
 * logout header widget
*/
/* eslint-disable */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthAction } from '../../store/slices/auth.slice';

const Logout = (props) => {
    const history = useHistory();
    const logout = useAuthAction('logout');

    const meta = {
        redirect: history.push,
        path: '/login',
    };

    useEffect(() => {
        logout({ meta });
    }, []);

    return <div />;
}

export default React.memo(Logout);
