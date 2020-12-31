import { authActions } from '../store/slices/auth.slice';
import { store } from '../index';

export default () =>
    new Promise(() => {
        store.dispatch(authActions.checkAuthorization());
    });
