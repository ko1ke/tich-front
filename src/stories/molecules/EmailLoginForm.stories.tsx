import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import EmailLoginForm from '../../components/molecules/EmailLoginForm';
import { User } from '../../typings';
import { Provider } from 'react-redux';

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
  title: 'Systems/Molecules/EmailLoginForm',
  component: EmailLoginForm,
  decorators: [(story) => <MockStore userState={{}}>{story()}</MockStore>],
} as ComponentMeta<typeof EmailLoginForm>;

const Template: ComponentStory<typeof EmailLoginForm> = (args) => (
  <EmailLoginForm {...args} />
);

export const Default = Template.bind({});
