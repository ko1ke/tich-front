import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router';

import KeywordSearchForm from '../../components/molecules/KeywordSearchForm';

export default {
  title: 'Systems/Molecules/KeywordSearchForm',
  component: KeywordSearchForm,
  args: {
    handler: (string) => console.log(string),
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof KeywordSearchForm>;

const Template: ComponentStory<typeof KeywordSearchForm> = (args) => (
  <KeywordSearchForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
