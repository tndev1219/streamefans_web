/**
 * Fixed header component
 */
/* eslint-disable */
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Grid,
    IconButton,
} from '@material-ui/core';

// components
import SidebarMenu from './Sidebar';

// header navlinks data
import headerNavLinks from '../../assets/data/HeaderNavLinks';


const FixedHeader = (props) => {
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClick = (index, path) => {
        setIndex(index);
        if (index === 4) {
            setOpen(true);
        }
        path && history.push(path);
    };

    return (
        <Grid container direction="row" justify="space-between" alignItems="center" className="iron-fixed-header bg-base">
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}></Grid>
            {headerNavLinks.map((nav, key) => (
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} key={key} style={{ justifyContent: 'center', display: 'flex' }}>
                    <IconButton onClick={() => handleClick(key, nav.path)} style={{ width: 48, height: 48, color: index === key ? "#00aff0" : "#8a96a3" }}>
                        {nav.icon}
                    </IconButton>
                </Grid>
            ))}
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}></Grid>
            <SidebarMenu open={open} setOpen={setOpen} />
        </Grid>
    )
}

export default React.memo(FixedHeader);
