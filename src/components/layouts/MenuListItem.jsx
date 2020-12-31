/**
 * Menu List Item
 */
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class MenuListItem extends Component {

    state = {
        menuOpen: false,
        subMenuOpen: '',
    }

    /**
    * On Toggle  Menu
    */
    onToggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen });
    }

    /**
    * On Toggle Collapse Menu
    */
    onToggleCollapseMenu(key) {
        if (this.state.subMenuOpen === '') {
            this.setState({ subMenuOpen: key });
        } else {
            this.setState({ subMenuOpen: '' });
        }
    }

    render() {
        const { menu} = this.props;
        return (
            <ListItem button component="li">
                {
                    <Button
                        to={menu.path}
                        component={Link}
                        className="tab-element"
                        onClick={this.props.closeDrawer}
                    >
                        <ListItemIcon>
                            <i className="material-icons">{menu.icon}</i>
                        </ListItemIcon>
                        {menu.menu_title}
                    </Button>
                }
            </ListItem>
        );
    }
}

MenuListItem.propTypes = {
    menu: PropTypes.object,
    closeDrawer: PropTypes.func,
};

export default MenuListItem;
