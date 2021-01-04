/**
 * site footer one component
 */
/* eslint-disable */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Divider } from '@material-ui/core';

export default Footer = (props) => {
    return (
        <footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="lg" style={{ position: 'fixed', bottom: 0 }}>
                <Divider />
                <Grid container spacing={3} direction="row" justify="space-between" alignItems="center" className="mt-10 mb-10" style={{ fontSize: 13, color: '#8a96a3', fontWeight: 'bold' }}>
                    <Grid item>
                        <span>@2020 StreaMeFans</span>
                        <span> ・ </span>
                        <span>Blog</span>
                        <span> ・ </span>
                        <span>Twitter</span>
                    </Grid>
                    <Grid item>
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
                    </Grid>
                    <Grid item>
                        <LanguageIcon />
                        <span> English</span>
                        <ExpandMoreIcon />
                    </Grid>
                </Grid>
            </Container>
        </footer>
    )
}
