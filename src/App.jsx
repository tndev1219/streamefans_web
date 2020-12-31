import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AsyncHomePageComponent,
  AsyncSignInPageComponent,
  AsyncNotificationsPageComponent,
  AsyncPostsPageComponent,
  AsyncChatsPageComponent,
} from './utilities/AsyncRoutes';
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import './lib/Css.js';

function App(props) {
  const getUrl = (pathname) => {
    const pathArray = pathname.split('/');
    const loginUrl = ['/login'];
    const isAuthPage = loginUrl.indexOf(`/${pathArray[1]}`) > -1;
    return isAuthPage;
  };

  return (
    <Fragment>
      {!getUrl(props.location.pathname) && <Header />}
      <Switch>
        <Route exact path="/" component={AsyncHomePageComponent} />
        <Route exact path="/login" component={AsyncSignInPageComponent} />
        <Route exact path="/notifications" component={AsyncNotificationsPageComponent} />
        <Route exact path="/posts" component={AsyncPostsPageComponent} />
        <Route exact path="/chats" component={AsyncChatsPageComponent} />
      </Switch>
      {getUrl(props.location.pathname) && <Footer />}
    </Fragment>
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default App;
