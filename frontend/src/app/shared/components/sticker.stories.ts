import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import {StickerComponent} from './sticker.component';

export const actionsData = {
  onDeleteSticker: action('onDeleteSticker'),
};

const meta: Meta<StickerComponent> = {
  title: 'Sticker',
  component: StickerComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: StickerComponent) => ({
    props: {
      ...args,
      onDeleteSticker: actionsData.onDeleteSticker,
    },
    template: `<app-sticker ${argsToTemplate(args)}></app-sticker>`,
  }),
};

export default meta;
type Story = StoryObj<StickerComponent>;

export const Default: Story = {
  args: {
    sticker: {
      id: 1,
      seller: 'P-03',
      amount: 35,
    },
  },
};

export const Pinned: Story = {
  args: {
    sticker: {
      ...Default.args?.sticker,
    },
  },
};

export const Archived: Story = {
  args: {
    sticker: {
      ...Default.args?.sticker,
    },
  },
};