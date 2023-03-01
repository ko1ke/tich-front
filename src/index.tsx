import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import { store, history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import flagsmith from 'flagsmith';
import { FlagsmithProvider } from 'flagsmith/react';

const queryClient = new QueryClient();
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <FlagsmithProvider
          options={{
            environmentID:
              process.env.REACT_APP_ELASTIC_SEARCH_FLAGSMITH_ENV_ID,
          }}
          flagsmith={flagsmith}
        >
          <App />
        </FlagsmithProvider>
      </ConnectedRouter>
    </ReduxProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
