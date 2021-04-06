import React, { Fragment } from 'react';
import { useHistory } from "react-router-dom";

// material ui
import {
    Container,
    Grid,
    AppBar,
    IconButton,
} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

// import {
//     MessageBox,
//     ChatList,
//     Input,
//     // Button,
//     Avatar,
// } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

// custom hooks
import { useASelector } from '../../utilities/recipies.util';

// component

const ChatsPage = (props) => {
    const history = useHistory();
    const language = useASelector((state) => state.global.language, []);

    return (
        <Fragment>
            <Container maxWidth="lg">
                <AppBar position="static" color="transparent" style={{ boxShadow: "0px 1px rgba(0,0,0,0.12)", marginTop: 50 }}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => history.goBack()} style={{ color: 'black' }}>
                                        <ArrowBackRoundedIcon />
                                    </IconButton>
                                    <span style={{ fontWeight: 500, fontSize: 19 }}>{language ? "メッセージ" : "MESSAGES"}</span>
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <SearchRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container direction="column" justify="space-between">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="mt-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a96a3' }}>
                        {language ? "まだメッセージがありません。" : "No messages yet!"}
                    </Grid>
                </Grid>
                {/* <Grid container direction="row" justify="space-between" style={{ borderLeft: '1px solid #eee', borderRight: '1px solid #eee' }} >
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className="mt-20" >
                        <ChatList
                            className='chat-list'
                            dataSource={[
                                {
                                    avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
                                    avatarFlexible: false,
                                    alt: 'Reactjs',
                                    title: 'Facebook',
                                    subtitle: 'What are you doing?',
                                    date: new Date(),
                                    unread: 0,
                                    // statusColor: 'green',
                                    // statusColorType={'encircle'},
                                    // statusColorType: 'badge',
                                },
                                {
                                    avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
                                    avatarFlexible: false,
                                    alt: 'Reactjs',
                                    title: 'Facebook',
                                    subtitle: 'What are you doing?',
                                    date: new Date(),
                                    unread: 0,
                                    // statusColor: 'gold',
                                    // statusColorType={'encircle'},
                                    // statusColorType: 'badge',
                                },
                            ]}
                            onClick={() => { }}
                            onContextMenu={() => { }}
                        />
                    </Grid>
                    <Grid
                        item xs={8} sm={8} md={8} lg={8} xl={8} className="mt-20"
                        style={{
                            borderLeft: '1px solid #eee',
                            borderRight: '1px solid #eee',
                            display: 'flex',
                        }}
                    >
                        <MessageBox
                            position={'left'}
                            type={'photo'}
                            text={'react.svg'}
                            data={{
                                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
                                status: {
                                    click: false,
                                    loading: 10,
                                },
                            }}
                        />
                        <MessageBox
                            reply={{
                                photoURL: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
                                title: 'elit magna',
                                titleColor: 'gold',
                                message: 'Aliqua amet incididunt id nostrud',
                            }}
                            onReplyMessageClick={() => console.log('reply clicked!')}
                            position={'left'}
                            type={'text'}
                            text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'}
                        />
                        <Avatar
                            src={'http://www.nretnil.com/avatar/LawrenceEzekielAmos.png'}
                            alt={'logo'}
                            size="large"
                            type="circle flexible"
                        />
                        <MessageBox
                            position={'left'}
                            type={'text'}
                            renderAddCmp={
                                <Grid>
                                    test
                                </Grid>
                            }
                            avatar={
                                'http://www.nretnil.com/avatar/LawrenceEzekielAmos.png'
                            }
                        />
                        <Input
                            placeholder="Type here..."
                            multiline={true}
                        // rightButtons={
                        //     <Button
                        //         color='white'
                        //         backgroundColor='black'
                        //         text='Send' />
                        // }
                        />
                    </Grid>
                </Grid> */}
            </Container>
        </Fragment >
    );
};

export default React.memo(ChatsPage);