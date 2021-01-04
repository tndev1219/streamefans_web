/**
 *  header-menu data
 */
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
/* eslint-disable */
export default [
    {
        "path": "/",
        "icon": <HomeOutlinedIcon style={{fontSize: 32}} />
    },
    {
        "path": "/notifications",
        "icon": <NotificationsNoneOutlinedIcon style={{fontSize: 32}} />
    },
    {
        "path": "/posts",
        "icon": <AddBoxOutlinedIcon style={{fontSize: 32}} />
    },
    {
        "path": "/chats",
        "icon": <ChatOutlinedIcon style={{fontSize: 32}} />
    },
    {
        "path": null,
        "icon": <AccountCircleOutlinedIcon style={{fontSize: 32}} />
    }
]
