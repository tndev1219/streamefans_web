/**
 * footer component
 */
/* eslint-disable */
import React from 'react';

// material ui
import {
    Container,
    Grid,
    Divider,
} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';
import { useGlobalAction } from '../../store/slices/global.slice';

const Footer = (props) => {
    const language = useASelector((state) => state.global.language, []);

    const setLanguageModal = useGlobalAction('setLanguageModal');

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
                        <Grid item className='mr-10' style={{ cursor: 'pointer' }} onClick={() => setLanguageModal(true)}>
                            <LanguageIcon />
                            <span> {language ? 'Japanese' : 'English'}</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default React.memo(Footer);