/**
 * Sidebar menu component
 */
import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Scrollbars } from 'react-custom-scrollbars';
import { List, ListItem, ListItemAvatar, ListItemText, ListItemIcon } from '@material-ui/core';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Avatar from '@material-ui/core/Avatar';
import appConfig from '../../constants/AppConfig';

import { useASelector } from '../../utilities/recipies.util';

// data
import settingsNavLinks from '../../assets/data/SettingsNavLinks';
import paymentNavLinks from '../../assets/data/PaymentNavLinks';
import helpNavLinks from '../../assets/data/HelpNavLinks';

// component
import Badge from '../global/Badge';

const SidebarMenu = (props) => {
    const history = useHistory();
    const profile = useASelector((state) => state.auth.profile, []);

    return (
        <div className="py-10 text-left iron-sidebar-nav-wrap">
            <SwipeableDrawer
                anchor="right"
                open={props.open}
                onClose={() => props.setOpen(false)}
                onOpen={() => props.setOpen(true)}
                className="sidebar-area"
            >
                <Scrollbars
                    autoHide
                    autoHideDuration={100}
                    style={{ width: 280, height: 'calc(100vh - 2rem)' }}
                >
                    <div className="vertical-menu py-40">
                        <List component="nav" className="iron-sidebar-menu">
                            <ListItem divider></ListItem>
                            <ListItem alignItems="flex-start" button divider onClick={() => { props.setOpen(false); history.push('/profile'); }}>
                                <ListItemAvatar>
                                    <Badge
                                        overlap="circle"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        variant="dot"
                                    >
                                        <Avatar alt="my-avatar" src={`${appConfig.URL}${profile.avatar}`} variant="circular" style={{ width: 50, height: 50, marginTop: -5 }} />
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={profile.display_name}
                                    secondary={`@${profile.username}`}
                                />
                            </ListItem>
                            {settingsNavLinks.map((NavLink, index) => (
                                <ListItem button key={index} onClick={() => { props.setOpen(false); history.push(NavLink.path); }}>
                                    <ListItemIcon>
                                        {NavLink.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={NavLink.menu_title}></ListItemText>
                                </ListItem>
                            ))}
                            <ListItem divider></ListItem>
                            {paymentNavLinks.map((NavLink, index) => (
                                <ListItem button key={index} onClick={() => { props.setOpen(false); history.push(NavLink.path); }}>
                                    <ListItemIcon>
                                        {NavLink.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={NavLink.menu_title}></ListItemText>
                                </ListItem>
                            ))}
                            <ListItem divider></ListItem>
                            {helpNavLinks.map((NavLink, index) => (
                                <ListItem button key={index} onClick={() => props.setOpen(false)}>
                                    <ListItemIcon>
                                        {NavLink.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={NavLink.menu_title}></ListItemText>
                                </ListItem>
                            ))}
                            <ListItem divider></ListItem>
                            <ListItem button onClick={() => { props.setOpen(false); history.push('/logout'); }}>
                                <ListItemIcon>
                                    <ExitToAppOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log out"></ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </Scrollbars>
            </SwipeableDrawer>
        </div>
    );
};

SidebarMenu.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
};

export default React.memo(SidebarMenu);
