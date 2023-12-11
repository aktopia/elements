import { wrapPage } from '@elements/compositions/wrap-page';
import { useDispatch, useValue } from '@elements/store/interface';
import { EditButton } from '@elements/components/edit-button';
import { useTranslation } from '@elements/translation';
import { Button } from '@elements/components/button';
import { TrashOutline } from '@elements/icons';
import { TextEditor } from '@elements/compositions/text-editor';
import { useCallback } from 'react';
import { WrapComingSoonPopover } from '@elements/components/coming-soon-popover';
import { Status } from '@elements/logic/meta/initiative';

const Account = wrapPage(() => {
  const t = useTranslation();
  const currentUserId = useValue('current.user/id');
  const currentUserName = useValue('user/name', { 'user/id': currentUserId });
  const currentUserEmail = useValue('user/email', { 'user/id': currentUserId });

  const startEditing = useDispatch('account.user.name/edit');

  const onEdit = useCallback(() => {
    startEditing({ 'user/id': currentUserId });
  }, [currentUserId, startEditing]);

  return (
    <div className={'flex flex-col gap-10'}>
      <div className={'flex w-full flex-col gap-4'}>
        <div className={'flex items-center gap-5'}>
          <label className={'text-sm font-medium text-gray-500'}>{t('common/name')}</label>
          <EditButton canEdit={true} className={'h-4 w-4 text-gray-500'} onEdit={onEdit} />
        </div>
        <TextEditor
          className={'text-base text-gray-800'}
          content={currentUserName}
          placeholder={t('common.user.name/placeholder')}
          refAttribute={'user/name'}
          refId={currentUserId}
          richText={false}
        />
      </div>
      <div className={'flex w-full flex-col gap-4'}>
        <label className={'text-sm font-medium text-gray-500'}>{t('common/email')}</label>
        <div className={'text-base text-gray-800'}>{currentUserEmail}</div>
      </div>
      <div>
        <WrapComingSoonPopover id={'account-delete'} status={Status.Planning}>
          <Button
            Icon={TrashOutline}
            data-event-id={'account-delete-button-click'}
            kind={'danger-outline'}
            size={'xs'}
            value={'Delete Account'}
          />
        </WrapComingSoonPopover>
      </div>
    </div>
  );
});

export default Account;
