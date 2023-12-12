import type { Evt, Sub } from '@elements/store/types';
import { evt, sub } from '@elements/store/register';

export type Subs = {
  'viewport/size': Sub<{}, string>;
};

export type Events = {
  'viewport/resize': Evt<{}>;
};

export const viewportSlice = () => ({
  'viewport/state': {
    'viewport/size': 'sm',
  },
});

sub('viewport/size', ({ state }) => state['viewport/state']['viewport/size']);

evt('viewport/resize', ({ setState }) => {
  const width = window.innerWidth;
  let viewportSize = 'sm';

  if (width < 640) {
    viewportSize = 'sm'; // < 640px
  } else if (width < 768) {
    viewportSize = 'md'; // >= 640px & < 768px
  } else if (width < 1024) {
    viewportSize = 'lg'; // >= 768px & < 1024px
  } else if (width < 1280) {
    viewportSize = 'xl'; // >= 1024px & < 1280px
  } else {
    viewportSize = '2xl'; // >= 1280px
  }

  setState((state: any) => {
    state['viewport/state']['viewport/size'] = viewportSize;
  });
});
