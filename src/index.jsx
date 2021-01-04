import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import ContentLoader from './components/global/Loader';
import reportWebVitals from './reportWebVitals';
import { createStoreWithMiddleware } from './store/createStore';
import { rootReducer } from './store/RootReducer';
// import { history } from './utilities/history.util';
import Boot from './store/boot';
import primaryTheme from './themes/primaryTheme';

export const { store } = createStoreWithMiddleware(rootReducer);

const DefaultLayout = React.lazy(() => import('./App'));

Boot()
  .then(
    ReactDOM.render(
      // <React.StrictMode>
      <Suspense fallback={<ContentLoader />}>
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={primaryTheme}>
              <DefaultLayout />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      </Suspense>
      // </React.StrictMode>
      ,
      document.getElementById('root'),
    ),
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
