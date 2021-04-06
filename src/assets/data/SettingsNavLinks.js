/**
 *  sidebar menu data
 */
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
// import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

/* eslint-disable */
export default [
    {
        "menu_title": "My Profile",
        "path": "/profile",
        "icon": <AccountCircleOutlinedIcon />
    },
    {
        "menu_title": "Bookmarks",
        "path": "/bookmarks",
        "icon": <BookmarkBorderOutlinedIcon />
    },
    // {
    //     "menu_title": "Lists",
    //     "path": "/lists",
    //     "icon": <FormatListNumberedOutlinedIcon />
    // },
    {
        "menu_title": "Settings",
        "path": "/settings",
        "icon": <SettingsOutlinedIcon />
    }
]
