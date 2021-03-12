import React, { Fragment } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import {
  AsyncSplashPageComponent,
  AsyncHomePageComponent,
  AsyncSignInPageComponent,
  AsyncEmailConfirmationPageComponent,
  AsyncNotificationsPageComponent,
  AsyncPostsPageComponent,
  AsyncChatsPageComponent,
  AsyncProfilePageComponent,
  AsyncBookmarksPageComponent,
  AsyncListsPageComponent,
  AsyncPaymentsPageComponent,
  AsyncAddCardPageComponent,
  AsyncBankingPageComponent,
  AsyncBillingSupportPageComponent,
  AsyncSettingsProfilePageComponent,
  AsyncSettingsAccountPageComponent,
  AsyncSettingsSecurityPageComponent,
  AsyncSettingsFansPageComponent,
  AsyncSettingsNotificationsPageComponent,
  AsyncSettingsDisplayPageComponent,
  AsyncSettingsChangeLogPageComponent,
  AsyncSettingsSubscriptionPageComponent,
  AsyncSettingsAccountUsernamePageComponent,
  AsyncSettingsAccountEmailPageComponent,
  AsyncSettingsAccountPhonePageComponent,
  AsyncSettingsAccountTwitterPageComponent,
  AsyncSettingsAccountGooglePageComponent,
  AsyncSettingsAccountPasswordPageComponent,
  AsyncSettingsAccountDeletePageComponent,
  AsyncSettingsNotificationsPushPageComponent,
  AsyncSettingsNotificationsEmailPageComponent,
  AsyncSettingsNotificationsSitePageComponent,
  AsyncSettingsNotificationsToastPageComponent,
} from './utilities/AsyncRoutes';
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import './lib/Css.js';
import './App.css';

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
      {!getUrl(location.pathname) && location.pathname !== '/' && <Header />}
      <Switch>
        <Redirect exact from="/settings" to="/settings/profile"></Redirect>
        <Route exact path="/" component={AsyncSplashPageComponent} />
        <Route exact path="/home" component={AsyncHomePageComponent} />
        <Route exact path="/login" component={AsyncSignInPageComponent} />
        <Route exact path="/registration/confirm/:email_verify_key" component={AsyncEmailConfirmationPageComponent} />
        <Route exact path="/notifications" component={AsyncNotificationsPageComponent} />
        <Route exact path="/posts" component={AsyncPostsPageComponent} />
        <Route exact path="/chats" component={AsyncChatsPageComponent} />
        <Route exact path="/profile" component={AsyncProfilePageComponent} />
        <Route exact path="/bookmarks" component={AsyncBookmarksPageComponent} />
        <Route exact path="/lists" component={AsyncListsPageComponent} />
        <Route exact path="/payments" component={AsyncPaymentsPageComponent} />
        <Route exact path="/payments/add_card" component={AsyncAddCardPageComponent} />
        <Route exact path="/banking" component={AsyncBankingPageComponent} />
        <Route exact path="/banking/support" component={AsyncBillingSupportPageComponent} />
        <Route exact path="/settings/profile" component={AsyncSettingsProfilePageComponent} />
        <Route exact path="/settings/account" component={AsyncSettingsAccountPageComponent} />
        <Route exact path="/settings/security" component={AsyncSettingsSecurityPageComponent} />
        <Route exact path="/settings/fans" component={AsyncSettingsFansPageComponent} />
        <Route exact path="/settings/notifications" component={AsyncSettingsNotificationsPageComponent} />
        <Route exact path="/settings/display" component={AsyncSettingsDisplayPageComponent} />
        <Route exact path="/settings/changelog" component={AsyncSettingsChangeLogPageComponent} />
        <Route exact path="/settings/subscription" component={AsyncSettingsSubscriptionPageComponent} />
        <Route exact path="/settings/account/username" component={AsyncSettingsAccountUsernamePageComponent} />
        <Route exact path="/settings/account/email" component={AsyncSettingsAccountEmailPageComponent} />
        <Route exact path="/settings/account/phone" component={AsyncSettingsAccountPhonePageComponent} />
        <Route exact path="/settings/account/twitter" component={AsyncSettingsAccountTwitterPageComponent} />
        <Route exact path="/settings/account/google" component={AsyncSettingsAccountGooglePageComponent} />
        <Route exact path="/settings/account/password" component={AsyncSettingsAccountPasswordPageComponent} />
        <Route exact path="/settings/account/delete" component={AsyncSettingsAccountDeletePageComponent} />
        <Route exact path="/settings/notifications/webpush" component={AsyncSettingsNotificationsPushPageComponent} />
        <Route exact path="/settings/notifications/email" component={AsyncSettingsNotificationsEmailPageComponent} />
        <Route exact path="/settings/notifications/site" component={AsyncSettingsNotificationsSitePageComponent} />
        <Route exact path="/settings/notifications/toast" component={AsyncSettingsNotificationsToastPageComponent} />
      </Switch>
      {getUrl(location.pathname) && <Footer />}
    </Fragment>
  );
};

export default App;
