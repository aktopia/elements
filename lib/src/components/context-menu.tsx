import { EllipsisHorizontalOutline, EllipsisVerticalOutline } from '@elements/icons';
import { Dropdown, type ItemType } from '@elements/components/dropdown';

type Orientation = 'vertical' | 'horizontal';

interface ContextMenuProps {
  orientation: Orientation;
  items: ItemType[];
}

const ContextMenuButton = ({ orientation }: { orientation: Orientation }) => {
  const Icon = orientation === 'vertical' ? EllipsisVerticalOutline : EllipsisHorizontalOutline;
  return <Icon className={'h-6 w-6 cursor-pointer text-gray-700'} />;
};

export const ContextMenu = ({ orientation, items }: ContextMenuProps) => {
  return <Dropdown button={<ContextMenuButton orientation={orientation} />} items={items} />;
};
