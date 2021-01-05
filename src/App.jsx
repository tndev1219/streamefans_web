import React, { Fragment } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import {
  AsyncHomePageComponent,
  AsyncSignInPageComponent,
  AsyncNotificationsPageComponent,
  AsyncPostsPageComponent,
  AsyncChatsPageComponent,
  AsyncProfilePageComponent,
  AsyncBookmarksPageComponent,
  AsyncListsPageComponent,
  AsyncPaymentsPageComponent,
  AsyncAddCardPageComponent,
} from './utilities/AsyncRoutes';
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import './lib/Css.js';

const App = () => {
  const location = useLocation();
  const getUrl = (pathname) => {
    const pathArray = pathname.split('/');
    const loginUrl = ['/login'];
    const isAuthPage = loginUrl.indexOf(`/${pathArray[1]}`) > -1;
    return isAuthPage;
  };

  return (
    <Fragment>
      {!getUrl(location.pathname) && <Header />}
      <Switch>
        <Route exact path="/" component={AsyncHomePageComponent} />
        <Route exact path="/login" component={AsyncSignInPageComponent} />
        <Route exact path="/notifications" component={AsyncNotificationsPageComponent} />
        <Route exact path="/posts" component={AsyncPostsPageComponent} />
        <Route exact path="/chats" component={AsyncChatsPageComponent} />
        <Route exact path="/profile" component={AsyncProfilePageComponent} />
        <Route exact path="/bookmarks" component={AsyncBookmarksPageComponent} />
        <Route exact path="/lists" component={AsyncListsPageComponent} />
        <Route exact path="/payments" component={AsyncPaymentsPageComponent} />
        <Route exact path="/payments/add_card" component={AsyncAddCardPageComponent} />
      </Switch>
      {getUrl(location.pathname) && <Footer />}
    </Fragment>
  );
};

export default App;
