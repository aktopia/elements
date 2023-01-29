import { NamedSwitch } from '@elements/components/named-switch';

export default {
  title: 'Components/NamedSwitch',
  component: NamedSwitch,
};

export function Examples() {
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
        onSwitchClick={() => {}}
      />
      <NamedSwitch
        activeSwitchId={'email'}
        size={'sm'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
        onSwitchClick={() => {}}
      />
      <NamedSwitch
        activeSwitchId={'social'}
        size={'md'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
        onSwitchClick={() => {}}
      />
    </div>
  );
}
