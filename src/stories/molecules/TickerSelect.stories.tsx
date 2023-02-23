import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TickerSelect from '../../components/molecules/TickerSelect';
import { Ticker, User } from '../../typings';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const queryClient = new QueryClient();

const MockStore = ({
  userState,
  children,
}: {
  userState: User;
  children: React.ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        currentUser: createSlice({
          name: 'currentUser',
          initialState: userState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  title: 'Systems/Molecules/TickerSelect',
  component: TickerSelect,
  parameters: {
    msw: {
      handlers: [
        rest.get(
          `${process.env.REACT_APP_BASE_URL}/tickers`,
          (req, res, ctx) => {
            return res(ctx.json(mockTickers));
          }
        ),
      ],
    },
  },
} as ComponentMeta<typeof TickerSelect>;

const Template: ComponentStory<typeof TickerSelect> = (args) => (
  <TickerSelect {...args} />
);

const mockTickers: Ticker[] = [{ symbol: 'MSFT', formalName: 'Microsoft' }];

export const LoggedIn = Template.bind({});
LoggedIn.decorators = [
  (story) => (
    <QueryClientProvider client={queryClient}>
      <MockStore userState={{ isAuthenticated: true }}>{story()}</MockStore>
    </QueryClientProvider>
  ),
];

export const NotLoggedIn = Template.bind({});
NotLoggedIn.decorators = [
  (story) => (
    <QueryClientProvider client={queryClient}>
      <MockStore userState={{ isAuthenticated: false }}>{story()}</MockStore>
    </QueryClientProvider>
  ),
];
