import { EllipsisHorizontalOutline, EllipsisVerticalOutline } from '@elements/icons';
import { Dropdown, type ItemType } from '@elements/components/dropdown';
import { cva } from '@elements/utils/style';

type Orientation = 'vertical' | 'horizontal';

interface ContextMenuProps {
  orientation: Orientation;
  items: ItemType[];
  dotsOnly?: boolean;
}

const containerVariant = cva('', {
  variants: {
    dotsOnly: {
      true: '',
      false: 'border border-gray-300 shadow-sm rounded-md',
    },
    orientation: {
      vertical: '',
      horizontal: '',
    },
  },
  compoundVariants: [
    { orientation: 'vertical', dotsOnly: false, class: 'px-0.5 py-1' },
    {
      orientation: 'horizontal',
      dotsOnly: false,
      class: 'px-0.5',
    },
  ],
});

const iconVariant = cva('text-gray-700', {
  variants: {
    dotsOnly: {
      true: 'h-6 w-6',
      false: 'h-5 w-5',
    },
  },
});

const ContextMenuButton = ({
  orientation,
  dotsOnly = true,
}: {
  orientation: Orientation;
  dotsOnly?: boolean;
}) => {
  const Icon = orientation === 'vertical' ? EllipsisVerticalOutline : EllipsisHorizontalOutline;
  return (
    <button className={containerVariant({ orientation, dotsOnly })} type={'button'}>
      <Icon className={iconVariant({ dotsOnly })} />
    </button>
  );
};

export const ContextMenu = ({ orientation, dotsOnly, items }: ContextMenuProps) => {
  return (
    <Dropdown
      button={<ContextMenuButton dotsOnly={dotsOnly} orientation={orientation} />}
      items={items}
    />
  );
};
