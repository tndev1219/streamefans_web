/**
 * footer component
 */
/* eslint-disable */
import React, { useState } from 'react';

// material ui
import {
    Box,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    RadioGroup,
    FormControlLabel,
    Button,
    Radio,
} from '@material-ui/core';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';

const options = [
    { label: 'English', value: false },
    { label: 'Japanese', value: true },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Portuguese', value: 'Portuguese' },
];

const LanguageModal = (props) => {
    const languageModal = useASelector((state) => state.global.languageModal, []);
    const language = useASelector((state) => state.global.language, []);

    const [value, setValue] = useState(language);

    const changeLanguage = useGlobalAction('changeLanguage');
    const setLanguageModal = useGlobalAction('setLanguageModal');

    const handleChange = (event) => {
        if (event.target.value === 'true') {
            setValue(true);
        } else {
            setValue(false);
        }
    };

    const handleClick = () => {
        setLanguageModal(false);
        changeLanguage({ value });
    };

    return (
        <Dialog open={languageModal} onClose={() => setLanguageModal(false)}>
            <DialogTitle>{language ? '言語選択' : 'Select Language'}</DialogTitle>
            <DialogContent>
                <RadioGroup
                    name="language"
                    value={value}
                    onChange={handleChange}
                >
                    {options.map((option, index) => (
                        <Box key={index}>
                            <FormControlLabel value={option.value} control={<Radio color={'primary'} />} label={option.label} />
                            <Divider />
                        </Box>
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setLanguageModal(false)}
                    color="primary"
                    style={{ borderRadius: 50 }}
                >
                    {language ? 'キャンセル' : 'Cancel'}
                </Button>
                <Button
                    onClick={handleClick}
                    color="primary"
                    style={{ borderRadius: 50 }}
                >
                    {language ? '保管' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(LanguageModal);