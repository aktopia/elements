import { NamedSwitch } from '@elements/components/named-switch';

export default {
  title: 'Components/NamedSwitch',
  component: NamedSwitch,
};

export const Examples = () => {
  return (
    <div className="flex items-end gap-10 ">
      <NamedSwitch
        onSwitchClick={() => {}}
        size="xs"
        activeSwitch={'phone'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
      />
      <NamedSwitch
        onSwitchClick={() => {}}
        size="sm"
        activeSwitch={'email'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
      />
      <NamedSwitch
        onSwitchClick={() => {}}
        size="md"
        activeSwitch={'social'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
      />
    </div>
  );
};
