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

// //Reset Password
// const AsyncResetPasswordPageComponent = Loadable({
// 	loader: () => import('../routes/reset-password'),
// 	loading: () => < ContentLoader />
// });

// //Contact us
// const AsyncContactUsPageComponent = Loadable({
//   loader: () => import('../routes/contact-us'),
//   loading: () => < ContentLoader />
// });

// //Checkout
// const AsyncCheckoutPageComponent = Loadable({
//   loader: () => import('../routes/check-out'),
//   loading: () => < ContentLoader />
// });

// //Shop
// const AsyncShopNowPageComponent = Loadable({
//   loader: () => import('../routes/shop'),
//   loading: () => < ContentLoader />
// });

// //Product Detail
// const AsyncProductDetailPageComponent = Loadable({
//   loader: () => import('../routes/product-detail'),
//   loading: () => < ContentLoader />
// });

// //Cart
// const AsyncCartPageComponent = Loadable({
//   loader: () => import('../routes/cart'),
//   loading: () => < ContentLoader />
// });

// //---- Customer -----//
// //customer account
// const AsyncUserAccountComponent = Loadable({
//   loader: () => import('../routes/account'),
//   loading: () => < ContentLoader />
// });
// //customer order history
// const AsyncUserOrderHistoryComponent = Loadable({
//   loader: () => import('../routes/account/order-history'),
//   loading: () => <ContentLoader />,
// });
// //customer profile
// const AsyncUserProfileComponent = Loadable({
//   loader: () => import('../routes/account/profile'),
//   loading: () => <ContentLoader />,
// });
// //customer address
// const AsyncUserAddressComponent = Loadable({
//   loader: () => import('../routes/account/address'),
//   loading: () => <ContentLoader />,
// });
// //customer cards
// const AsyncUserCardsComponent = Loadable({
//   loader: () => import('../routes/account/cards'),
//   loading: () => <ContentLoader />,
// });
// //customer edit 
// const AsyncUserEditComponent = Loadable({
//   loader: () => import('../routes/account/edit'),
//   loading: () => <ContentLoader />,
// });

// // page404
// const AsyncPageNotFoundComponent = Loadable({
//   loader: () => import('../routes/page-404'),
//   loading: () => < ContentLoader /> ,
// });

// //---- Farmer ----//
// //farmer invoice list
// const AsyncFarmerOrderListComponent = Loadable({
//   loader: () => import('../routes/farmer/orders'),
//   loading: () => < ContentLoader /> ,
// });
// //farmer Reports list
// const AsyncFarmerReportsComponent = Loadable({
//   loader: () => import('../routes/farmer/dashboard'),
//   loading: () => < ContentLoader /> ,
// });
// //farmer products grid/list
// const AsyncProductsGridComponent = Loadable({
//   loader: () => import('../routes/farmer/products'),
//   loading: () => < ContentLoader /> ,
// });
// //add product in admin panel
// const AsyncProductAddComponent = Loadable({
//   loader: () => import('../routes/farmer/products/product-add'),
//   loading: () => < ContentLoader /> ,
// });
// //edit product in admin panel
// const AsyncProductEditComponent = Loadable({
//   loader: () => import('../routes/farmer/products/product-edit'),
//   loading: () => < ContentLoader /> ,
// });
// //detail product in admin panel
// const AsyncProductDetailComponent = Loadable({
//   loader: () => import('../routes/farmer/products/product-detail'),
//   loading: () => < ContentLoader /> ,
// });
// //farmer account details
// const AsyncFarmerProfileDetailComponent = Loadable({
//   loader: () => import('../routes/farmer/account'),
//   loading: () => < ContentLoader /> ,
// });

// //---- Driver ----//
// //driver Reports list
// const AsyncDriverReportsComponent = Loadable({
//   loader: () => import('../routes/driver/dashboard'),
//   loading: () => < ContentLoader /> ,
// });
// //driver invoice list
// const AsyncDriverInvoiceListComponent = Loadable({
//   loader: () => import('../routes/driver/invoices'),
//   loading: () => < ContentLoader /> ,
// });
// //driver delivery list
// const AsyncDeliveryListComponent = Loadable({
//   loader: () => import('../routes/driver/deliveries'),
//   loading: () => < ContentLoader /> ,
// });
// //driver account details
// const AsyncDriverProfileDetailComponent = Loadable({
//   loader: () => import('../routes/driver/account'),
//   loading: () => < ContentLoader /> ,
// });

export {
  AsyncHomePageComponent,
  AsyncNotificationsPageComponent,
  AsyncPostsPageComponent,
  AsyncSignInPageComponent,
  AsyncChatsPageComponent,
  AsyncProfilePageComponent,
  // AsyncResetPasswordPageComponent,
  // AsyncContactUsPageComponent,
  // AsyncCheckoutPageComponent,
  // AsyncShopNowPageComponent,
  // AsyncProductDetailPageComponent,
  // AsyncCartPageComponent,
  // AsyncUserAccountComponent,
  // AsyncUserOrderHistoryComponent,
  // AsyncUserProfileComponent,
  // AsyncUserAddressComponent,
  // AsyncUserCardsComponent,
  // AsyncUserEditComponent,
  // AsyncPageNotFoundComponent,
  // AsyncFarmerOrderListComponent,
  // AsyncFarmerReportsComponent,
  // AsyncProductsGridComponent,
  // AsyncProductAddComponent,
  // AsyncProductEditComponent,
  // AsyncProductDetailComponent,
  // AsyncFarmerProfileDetailComponent,
  // AsyncDriverReportsComponent,
  // AsyncDriverInvoiceListComponent,
  // AsyncDeliveryListComponent,
  // AsyncDriverProfileDetailComponent
};