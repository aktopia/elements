import { cx } from 'cva';
import { PencilOutline } from '@elements/icons';

export const EditButton = ({ canEdit, onEdit, className }: any) => {
  return canEdit ? (
    <PencilOutline className={cx('cursor-pointer', className)} onClick={onEdit} />
  ) : null;
};
