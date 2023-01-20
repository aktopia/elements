import { FollowButton } from '@elements/components/follow-button';

export default {
  title: 'Components/FollowButton',
  component: FollowButton,
};

export const Tertiary = {
  render: () => {
    return (
      <div className="flex-column flex gap-10">
        <div className="flex gap-10">
          <FollowButton variant={{ type: 'tertiary', size: 'xs' }} count={1230} />
        </div>
      </div>
    );
  },
};
