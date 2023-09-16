import { SeveritySlider as Component } from '@elements/compositions/issue/severity-slider';
import { store } from '@story/stores/issue/severity-slider';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Issue/SeveritySlider',
  component: Component,
};

export const SeveritySlider = mockStory({
  store,
  args: { suspenseLines: 8 },
  render: () => {
    return <Component />;
  },
});
