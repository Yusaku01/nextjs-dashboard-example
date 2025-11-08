import type { Meta, StoryObj } from '@storybook/react';
import AcmeLogo from './acme-logo';

const meta: Meta<typeof AcmeLogo> = {
  title: 'Brand/AcmeLogo',
  component: AcmeLogo,
};

export default meta;
type Story = StoryObj<typeof AcmeLogo>;

export const Default: Story = {};

