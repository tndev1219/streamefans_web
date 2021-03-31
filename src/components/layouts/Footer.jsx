/**
 * footer component
 */
/* eslint-disable */
import React, { useState } from 'react';

// material ui
import {
    Container,
    Grid,
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
import LanguageIcon from '@material-ui/icons/Language';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';

const options = [
    { label: 'English', value: false },
    { label: 'Japanese', value: true },
];

const Footer = (props) => {
    const language = useASelector((state) => state.global.language, []);

    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = React.useState(language);

    const changeLanguage = useGlobalAction('changeLanguage');

    const handleChange = (event) => {
        if (event.target.value === 'true') {
            setValue(true);
        } else {
            setValue(false);
        }
    };

    const handleClick = () => {
        setShowModal(false);
        changeLanguage({ value });
    }

    return (
        <Container maxWidth="lg" style={{ position: 'fixed', bottom: 0, backgroundColor: 'white' }}>
            <Grid container direction='column'>
                <Grid item>
                    <Divider style={{ width: '100%' }} />
                </Grid>
                <Grid item>
                    <Grid container spacing={3} direction="row" justify="space-between" alignItems="center" className="mt-5 mb-5" style={{ fontSize: 13, color: '#8a96a3', fontWeight: 500 }}>
                        <Grid item className='ml-10'>
                            <span>@2021 StreaMeFans</span>
                            {/* <span> ・ </span>
                            <span>Blog</span>
                            <span> ・ </span>
                            <span>Twitter</span> */}
                        </Grid>
                        {/* <Grid item>
                            <span>FAQs</span>
                            <span> ・ </span>
                            <span>Terms</span>
                            <span> ・ </span>
                            <span>Privacy</span>
                            <span> ・ </span>
                            <span>Contact</span>
                            <span> ・ </span>
                            <span>How it works</span>
                            <span> ・ </span>
                            <span>Refferrals</span>
                            <span> ・ </span>
                            <span>USC 2257</span>
                        </Grid> */}
                        <Grid item className='mr-10' style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                            <LanguageIcon />
                            <span> {language ? 'Japanese' : 'English'}</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>{language ? '言語選択' : 'Select Language'}</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        name="language"
                        value={value}
                        onChange={handleChange}
                    >
                        {options.map((option, index) => (
                            <FormControlLabel value={option.value} key={index} control={<Radio color={'primary'} />} label={option.label} />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setShowModal(false)}
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
        </Container>
    )
}

export default React.memo(Footer);