import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import ContentLoader from './components/global/Loader';
import reportWebVitals from './reportWebVitals';
import { createStoreWithMiddleware } from './store/createStore';
import { rootReducer } from './store/RootReducer';
import primaryTheme from './themes/primaryTheme';

export const { persistor, store } = createStoreWithMiddleware(rootReducer);

const DefaultLayout = React.lazy(() => import('./App'));

ReactDOM.render(
  <Suspense fallback={<ContentLoader />}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={primaryTheme}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={DefaultLayout} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </Suspense>
  ,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
