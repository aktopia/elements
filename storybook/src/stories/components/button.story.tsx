import { Button } from '@elements/components/button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = {
  render: () => {
    return (
      <div className={'flex-column flex gap-10'}>
        <div className={'flex items-end gap-10'}>
          <Button kind={'primary'} size={'xs'} value={'Button'} />
          <Button kind={'primary'} size={'sm'} value={'Button'} />
          <Button kind={'primary'} size={'md'} value={'Button'} />
        </div>
      </div>
    );
  },
};

export const Tertiary = {
  render: () => {
    return (
      <div className={'flex-column flex gap-10'}>
        <div className={'flex items-end gap-10'}>
          <Button kind={'tertiary'} size={'xs'} value={'Button'} />
          <Button kind={'tertiary'} size={'sm'} value={'Button'} />
          <Button kind={'tertiary'} size={'md'} value={'Button'} />
        </div>
      </div>
    );
  },
};
