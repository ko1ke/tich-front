import ReactDOM from 'react-dom';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import { store, history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ReduxProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
