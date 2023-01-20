import { Button } from '@elements/components/button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = {
  render: () => {
    return (
      <div className="flex-column flex gap-10">
        <div className="flex items-center gap-10">
          <Button value={'Button'} size="xs" kind="primary" />
          <Button value={'Button'} size="sm" kind="primary" />
        </div>
      </div>
    );
  },
};

export const Tertiary = {
  render: () => {
    return (
      <div className="flex-column flex gap-10">
        <div className="flex items-center gap-10">
          <Button value={'Button'} size="xs" kind="tertiary" />
          <Button value={'Button'} size="xs" kind="tertiary" clicked={true} />
          <Button value={'Button'} size="sm" kind="tertiary" />
        </div>
      </div>
    );
  },
};
