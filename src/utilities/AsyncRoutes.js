/**
 * AsyncRoutes
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';

// Home
const AsyncHomePageComponent = React.lazy(() => import('../routes/home'));

// Notifications
const AsyncNotificationsPageComponent = React.lazy(() => import('../routes/notifications'));

// Posts
const AsyncPostsPageComponent = React.lazy(() => import('../routes/posts'));

// SignIn
const AsyncSignInPageComponent = React.lazy(() => import('../routes/signin'));

// Chat
const AsyncChatsPageComponent = React.lazy(() => import('../routes/chats'));

// Profile
const AsyncProfilePageComponent = React.lazy(() => import('../routes/profile'));

// Bookmarks
const AsyncBookmarksPageComponent = React.lazy(() => import('../routes/bookmarks'));

// Lists
const AsyncListsPageComponent = React.lazy(() => import('../routes/lists'));

// Payments
const AsyncPaymentsPageComponent = React.lazy(() => import('../routes/payments'));

// Add Card
const AsyncAddCardPageComponent = React.lazy(() => import('../routes/payments/addcard'));

export {
  AsyncHomePageComponent,
  AsyncNotificationsPageComponent,
  AsyncPostsPageComponent,
  AsyncSignInPageComponent,
  AsyncChatsPageComponent,
  AsyncProfilePageComponent,
  AsyncBookmarksPageComponent,
  AsyncListsPageComponent,
  AsyncPaymentsPageComponent,
  AsyncAddCardPageComponent,
};