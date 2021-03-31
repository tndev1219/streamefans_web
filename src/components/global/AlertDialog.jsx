import React from 'react';

// material ui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';

const SignIn = (props) => {
    const alertDialogState = useASelector((state) => state.global.alertDialogState, []);
    const alertDialogMessage = useASelector((state) => state.global.alertDialogMessage, []);

    const setAlertDialog = useGlobalAction('setAlertDialog');

    return (
        <Dialog open={alertDialogState} onClose={() => setAlertDialog({ alertDialogState: false, alertDialogMessage: '' })}>
            <DialogTitle>
                {"Message"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {alertDialogMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setAlertDialog({ alertDialogState: false, alertDialogMessage: '' })}
                    color="primary"
                    style={{ borderRadius: 50, fontWeight: 'bold' }}
                >
                    close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default React.memo(SignIn);