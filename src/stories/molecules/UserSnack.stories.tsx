import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { User } from '../../typings';
import UserSnack from '../../components/molecules/UserSnack';
import { configureStore, createSlice } from '@reduxjs/toolkit';

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
          reducers: {
            resetAuthenticationError: (state) => {
              state.isAuthenticationError = null;
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  title: 'Systems/Molecules/UserSnack',
  component: UserSnack,
} as ComponentMeta<typeof UserSnack>;

const Template: ComponentStory<typeof UserSnack> = (args) => (
  <UserSnack {...args} />
);

export const Success = Template.bind({});
Success.decorators = [
  (story) => (
    <MockStore
      userState={{
        isAuthenticationError: false,
        isAuthenticated: true,
        success: { message: 'success' },
      }}
    >
      {story()}
    </MockStore>
  ),
];

export const Error = Template.bind({});
Error.decorators = [
  (story) => (
    <MockStore
      userState={{
        isAuthenticationError: true,
        isAuthenticated: false,
        error: { message: 'error' },
      }}
    >
      {story()}
    </MockStore>
  ),
];
