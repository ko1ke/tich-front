import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { User } from '../../typings';
import { Provider } from 'react-redux';

import EmailSignUpForm from '../../components/molecules/EmailSignUpForm';

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
  title: 'Systems/Molecules/EmailSignUpForm',
  component: EmailSignUpForm,
  decorators: [(story) => <MockStore userState={{}}>{story()}</MockStore>],
} as ComponentMeta<typeof EmailSignUpForm>;

const Template: ComponentStory<typeof EmailSignUpForm> = (args) => (
  <EmailSignUpForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
