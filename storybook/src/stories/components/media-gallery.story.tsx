import { MediaGallery as Component } from '@elements/components/media-gallery';
import { images } from '@story/stores/images';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/MediaGallery',
  component: Component,
};

export const MediaGallery: StoryObj<typeof Component> = {
  args: { images },
  render: (args) => {
    return (
      <div className={'bg-white'}>
        <Component {...args} />
      </div>
    );
  },
};
