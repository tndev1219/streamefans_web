/**
 * AsyncRoutes
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';

// Splash
const AsyncSplashPageComponent = React.lazy(() => import('../routes/splash'));

// Home
const AsyncHomePageComponent = React.lazy(() => import('../routes/home'));

// Notifications
const AsyncNotificationsPageComponent = React.lazy(() => import('../routes/notifications'));

// Posts
const AsyncPostsPageComponent = React.lazy(() => import('../routes/posts'));

// SignIn
const AsyncSignInPageComponent = React.lazy(() => import('../routes/signin'));

// Email Confirmation
const AsyncEmailConfirmationPageComponent = React.lazy(() => import('../routes/signin/emailConfirm'));

// Restore Access
const AsyncRestoreAccessPageComponent = React.lazy(() => import('../routes/signin/restoreAccess'));

// Log Out
const AsyncLogoutPageComponent = React.lazy(() => import('../routes/logout'));

// Chat
const AsyncChatsPageComponent = React.lazy(() => import('../routes/chats'));

// Profile
const AsyncMyProfilePageComponent = React.lazy(() => import('../routes/profile'));

// Bookmarks
const AsyncBookmarksPageComponent = React.lazy(() => import('../routes/bookmarks'));

// Lists
const AsyncListsPageComponent = React.lazy(() => import('../routes/lists'));

// Payments
const AsyncPaymentsPageComponent = React.lazy(() => import('../routes/payments'));

// Add Card
const AsyncAddCardPageComponent = React.lazy(() => import('../routes/payments/addcard'));

// Banking
const AsyncBankingPageComponent = React.lazy(() => import('../routes/banking'));

// Billing Support
const AsyncBillingSupportPageComponent = React.lazy(() => import('../routes/banking/support'));

// Settings
const AsyncSettingsPageComponent = React.lazy(() => import('../routes/settings'));

// Settings Profile
const AsyncSettingsProfilePageComponent = React.lazy(() => import('../routes/settings/profile'));

// Settings Account
const AsyncSettingsAccountPageComponent = React.lazy(() => import('../routes/settings/account'));

// Settings Security
const AsyncSettingsSecurityPageComponent = React.lazy(() => import('../routes/settings/security'));

// Settings Fans
const AsyncSettingsFansPageComponent = React.lazy(() => import('../routes/settings/fans'));

// Settings Notifications
const AsyncSettingsNotificationsPageComponent = React.lazy(() => import('../routes/settings/notifications'));

// Settings Display
const AsyncSettingsDisplayPageComponent = React.lazy(() => import('../routes/settings/display'));

// Settings Changelog
const AsyncSettingsChangeLogPageComponent = React.lazy(() => import('../routes/settings/changelog'));

// Settings Subscription
const AsyncSettingsSubscriptionPageComponent = React.lazy(() => import('../routes/settings/subscription'));

// Settings Account Username
const AsyncSettingsAccountUsernamePageComponent = React.lazy(() => import('../routes/settings/account/username'));

// Settings Account Email
const AsyncSettingsAccountEmailPageComponent = React.lazy(() => import('../routes/settings/account/email'));

// Settings Account Phone
const AsyncSettingsAccountPhonePageComponent = React.lazy(() => import('../routes/settings/account/phone'));

// Settings Account Twitter
const AsyncSettingsAccountTwitterPageComponent = React.lazy(() => import('../routes/settings/account/twitter'));

// Settings Account Google
const AsyncSettingsAccountGooglePageComponent = React.lazy(() => import('../routes/settings/account/google'));

// Settings Account Password
const AsyncSettingsAccountPasswordPageComponent = React.lazy(() => import('../routes/settings/account/password'));

// Settings Account Delete
const AsyncSettingsAccountDeletePageComponent = React.lazy(() => import('../routes/settings/account/delete'));

// Settings Notifications Push
const AsyncSettingsNotificationsPushPageComponent = React.lazy(() => import('../routes/settings/notifications/push'));

// Settings Notifications Email
const AsyncSettingsNotificationsEmailPageComponent = React.lazy(() => import('../routes/settings/notifications/email'));

// Settings Notifications Site
const AsyncSettingsNotificationsSitePageComponent = React.lazy(() => import('../routes/settings/notifications/site'));

// Settings Notifications toast
const AsyncSettingsNotificationsToastPageComponent = React.lazy(() => import('../routes/settings/notifications/toast'));

export {
  AsyncSplashPageComponent,
  AsyncHomePageComponent,
  AsyncNotificationsPageComponent,
  AsyncPostsPageComponent,
  AsyncSignInPageComponent,
  AsyncEmailConfirmationPageComponent,
  AsyncRestoreAccessPageComponent,
  AsyncLogoutPageComponent,
  AsyncChatsPageComponent,
  AsyncMyProfilePageComponent,
  AsyncBookmarksPageComponent,
  AsyncListsPageComponent,
  AsyncPaymentsPageComponent,
  AsyncAddCardPageComponent,
  AsyncBankingPageComponent,
  AsyncBillingSupportPageComponent,
  AsyncSettingsPageComponent,
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
};