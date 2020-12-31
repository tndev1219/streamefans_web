/**
 * site header one component
 */
/* eslint-disable */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';

// components
import FixedHeader from './FixedHeader';

const Header = () => {
    return (
        <AppBar
            position="fixed"
            className="header-fixed"
            style={{ boxShadow: "0px 0px 0px -1px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 1px 2px 0px rgba(0,0,0,0.12)" }}
        >
            <FixedHeader />
        </AppBar>
    );
}

export default Header;