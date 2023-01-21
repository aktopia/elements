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
        activeId={'phone'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
      />
      <NamedSwitch
        onSwitchClick={() => {}}
        size="sm"
        activeId={'email'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
      />
      <NamedSwitch
        onSwitchClick={() => {}}
        size="md"
        activeId={'social'}
        switches={[
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email' },
          { id: 'social', label: 'Social' },
        ]}
      />
    </div>
  );
};
