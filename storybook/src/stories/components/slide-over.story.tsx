import {
  SlideOver as Component,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';
import { lorem } from '@story/utils/string';
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/SlideOver',
  component: Component,
};

type Story = StoryObj<typeof Component>;

const onClick = action('close-slide-over');
const body = lorem.generateParagraphs(3);

export const SlideOver: Story = {
  args: {
    visible: true,
  },
  render: ({ visible }) => {
    return (
      <Component visible={visible}>
        <SlideOverHeader>
          <SlideOverTitle title={'Title'} />
          <SlideOverCloseButton onClick={onClick} />
        </SlideOverHeader>
        <SlideOverBody>
          <div className={''}>{body}</div>
        </SlideOverBody>
      </Component>
    );
  },
};
