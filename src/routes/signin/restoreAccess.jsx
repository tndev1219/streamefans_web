import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuthAction } from '../../store/slices/auth.slice';
import SnackBar from '../../components/global/SnackBar';

const RestoreAccess = (props) => {
    const history = useHistory();
    const params = useParams();
    const restoreAccess = useAuthAction('restoreAccess');
    const meta = {
        redirect: history.push,
        path: '/settings/account/password',
    };

    useEffect(() => {
        restoreAccess({ data: { reset_password_key: params.reset_password_key }, meta });
    }, []);

    return (
        <SnackBar />
    );
};

export default React.memo(RestoreAccess);