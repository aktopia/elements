import { NamedSwitch } from '@elements/components/named-switch';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/NamedSwitch',
  component: NamedSwitch,
};

export function Examples() {
  const onClick = action('onSwitchClick');

  return (
    <div className={'flex items-end gap-10 '}>
      <NamedSwitch
        activeSwitchId={'phone'}
        size={'xs'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
        onSwitchClick={onClick}
      />
      <NamedSwitch
        activeSwitchId={'email'}
        size={'sm'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
        onSwitchClick={onClick}
      />
      <NamedSwitch
        activeSwitchId={'social'}
        size={'md'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
        onSwitchClick={onClick}
      />
    </div>
  );
}
