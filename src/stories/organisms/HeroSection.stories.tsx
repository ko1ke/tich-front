import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter, Switch } from 'react-router-dom';

import HeroSection from '../../components/organisms/HeroSection';

export default {
  title: 'Systems/Organisms/HeroSection',
  component: HeroSection,
  decorators: [
    (story) => (
      <BrowserRouter>
        <Switch>{story()}</Switch>
      </BrowserRouter>
    ),
  ],
} as ComponentMeta<typeof HeroSection>;

const Template: ComponentStory<typeof HeroSection> = (args) => (
  <HeroSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  backgroundUrl: 'https://dummyimage.com/1024x768/000/fff',
};
