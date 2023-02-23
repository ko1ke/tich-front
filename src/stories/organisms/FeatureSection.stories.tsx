import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FeatureSection from '../../components/organisms/FeatureSection';

export default {
  title: 'Systems/Organisms/FeatureSection',
  component: FeatureSection,
} as ComponentMeta<typeof FeatureSection>;

const Template: ComponentStory<typeof FeatureSection> = () => (
  <FeatureSection />
);

export const Default = Template.bind({});
Default.args = {};
