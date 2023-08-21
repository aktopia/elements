import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store/interface';
import { PencilSolid } from '@elements/icons';
import { cx } from 'cva';

export const EditButton = suspensify(({ canEditKey, editKey, className }: any) => {
  const canEdit = useValue<boolean>(canEditKey);
  const onEdit = useDispatch(editKey);

  return canEdit ? (
    <PencilSolid className={cx('cursor-pointer', className)} onClick={onEdit} />
  ) : null;
});
