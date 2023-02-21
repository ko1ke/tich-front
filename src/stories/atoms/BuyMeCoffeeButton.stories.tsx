import { ComponentStory, ComponentMeta } from '@storybook/react';
import BuyMeCoffeeButton from '../../components/atoms/BuyMeCoffeeButton';

export default {
  title: 'Systems/Atoms/BuyMeCoffeeButton',
  component: BuyMeCoffeeButton,
} as ComponentMeta<typeof BuyMeCoffeeButton>;

const Template: ComponentStory<typeof BuyMeCoffeeButton> = (args) => (
  <BuyMeCoffeeButton {...args} />
);

export const Inherit = Template.bind({});
Inherit.args = {
  handleChip: () => alert('chip!'),
};
