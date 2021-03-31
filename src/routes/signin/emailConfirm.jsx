import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuthAction } from '../../store/slices/auth.slice';

const EmailConfirmation = (props) => {
    const history = useHistory();
    const params = useParams();
    const emailVerify = useAuthAction('emailVerify');
    const meta = {
        redirect: history.push,
        path: '/home',
    };

    useEffect(() => {
        emailVerify({ data: { email_verify_key: params.email_verify_key }, meta });
    }, []);

    return (
        <></>
    );
};

export default React.memo(EmailConfirmation);