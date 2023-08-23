import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store/interface';
import { cx } from 'cva';
import { PencilOutline } from '@elements/icons';

export const EditButton = suspensify(({ canEditKey, editKey, className }: any) => {
  const canEdit = useValue(canEditKey);
  const onEdit = useDispatch(editKey);

  return canEdit ? (
    <PencilOutline className={cx('cursor-pointer', className)} onClick={onEdit} />
  ) : null;
});
