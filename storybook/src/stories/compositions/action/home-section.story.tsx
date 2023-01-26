import { HomeSection as Component } from '@elements/compositions/action/home-section';
import { StoryObj } from '@storybook/react';
import { createActions, MockStore } from '@story/utils/mock-store';

export default {
  title: 'Compositions/Action/ActionHeader',
  component: Component,
};

const read = {
  'current.action/id': '2',
  'action/outcome':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies non euismod lectus blandit venenatis. Eget aenean faucibus netus arcu sed sed et amet. Venenatis arcu ipsum scelerisque sed ac luctus. Ornare id libero faucibus donec. Nunc magnis lacus pulvinar euismod egestas amet. Ornare at id cras imperdiet.',
  'action/description':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies non euismod lectus blandit venenatis. Eget aenean faucibus netus arcu sed sed et amet. Venenatis arcu ipsum scelerisque sed ac luctus. Ornare id libero faucibus donec. Nunc magnis lacus pulvinar euismod egestas amet. Ornare at id cras imperdiet. Fermentum vulputate faucibus commodo ut imperdiet nisl etiam ac augue. Odio id eget senectus et. Gravida arcu elementum arcu non. Vitae facilisi risus, ultricies cras feugiat duis semper enim. Odio fermentum ultricies rutrum diam.',
  'action/relations': [
    {
      type: 'issue',
      title: 'Large Garbage Dump on Vandipalayam Road.',
      relation: 'resolves',
      facing: 45,
      severity: { high: 987 },
    },
    {
      type: 'issue',
      title: 'Garbage being dumped on Narayan nagar.',
      relation: 'partially-resolves',
      facing: 22,
      severity: { high: 324 },
    },
    {
      type: 'action',
      title: 'Disinfect the stagnated water near Garbage dump in Vandipalayam road.',
      relation: 'relates',
      work: { percentage: 45 },
      funding: { percentage: 93 },
      bump: { count: 987 },
    },
  ],
};

const dispatch = createActions([]);

type Story = StoryObj<typeof Component>;

export const HomeSection: Story = {
  args: read,
  render: (args: any) => {
    return (
      <MockStore dispatch={dispatch} read={args}>
        <Component />
      </MockStore>
    );
  },
};
