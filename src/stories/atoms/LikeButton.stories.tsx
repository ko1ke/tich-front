import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LikeButton from '../../components/atoms/LikeButton';

export default {
  title: 'Systems/Atoms/LikeButton',
  component: LikeButton,
  args: {
    handleChangeLike: () => alert('change like'),
  },
} as ComponentMeta<typeof LikeButton>;

const Template: ComponentStory<typeof LikeButton> = (args) => (
  <LikeButton {...args} />
);

export const Liked = Template.bind({});
Liked.args = {
  isFavorite: true,
};

export const NotLiked = Template.bind({});
NotLiked.args = {
  isFavorite: false,
};
