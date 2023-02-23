import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { PortfolioItem, Ticker, User } from '../../typings';
import { Provider } from 'react-redux';

import PortfolioTable from '../../components/organisms/PortfolioTable';

const mockTickers: Ticker[] = [
  { symbol: 'MSFT', formalName: 'Microsoft' },
  { symbol: 'AAPL', formalName: 'Apple' },
];
const mockPortfolio: PortfolioItem[] = [
  { symbol: 'MSFT', price: 100, change: 200, note: 'note', targetPrice: 100 },
  { symbol: 'AAPL', price: 100, change: 200, note: 'note', targetPrice: 100 },
];

const MockStore = ({ children }: { children: React.ReactNode }) => (
  <Provider
    store={configureStore({
      reducer: {
        currentUser: createSlice({
          name: 'currentUser',
          initialState: { uid: 'dummy_uid', idToken: 'dummy_token' } as User,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);
export default {
  title: 'Systems/Organisms/PortfolioTable',
  component: PortfolioTable,
  decorators: [(story) => <MockStore>{story()}</MockStore>],
  args: {
    sheet: mockPortfolio,
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(
          `${process.env.REACT_APP_BASE_URL}/tickers`,
          (req, res, ctx) => {
            return res(ctx.json(mockTickers));
          }
        ),
        rest.post(
          `${process.env.REACT_APP_BASE_URL}/portfolios`,
          async (req, res, ctx) => {
            const body = await req.json();
            body.portfolio.sheet = body.portfolio.sheet.map((item) => {
              return { ...item, price: 100, change: 200 };
            });
            return res(ctx.json(body.portfolio));
          }
        ),
      ],
    },
  },
} as ComponentMeta<typeof PortfolioTable>;

const Template: ComponentStory<typeof PortfolioTable> = (args) => (
  <PortfolioTable {...args} />
);

export const Default = Template.bind({});
