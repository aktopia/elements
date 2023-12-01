import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { useDispatch, useValue } from '@elements/store/interface';
import React, { useCallback } from 'react';
import { Modal, ModalPanel, ModalTitle } from '@elements/components/modal';
import { Button } from '@elements/components/button';

const UserRegistration_ = suspensify(({}) => {
  const t = useTranslation();

  const currentUserId = useValue('current.user/id');
  const visible = useValue('user.registration/pending', { 'user/id': currentUserId });
  const name = useValue('user.registration.input/name');

  const updateName = useDispatch('user.registration.input.name/update');
  const onComplete = useDispatch('user.registration/done');

  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateName({ value: e.target.value });
    },
    [updateName]
  );

  return (
    <Modal visible={visible}>
      <ModalPanel>
        <div className={'flex w-full flex-col gap-7 py-7 px-6'}>
          <ModalTitle className={'text-lg font-medium leading-6 text-gray-900'}>
            {t('common/welcome-to-aktopia')}
          </ModalTitle>
          <form className={'flex w-max flex-col gap-8'}>
            <input
              className={
                'w-[500px] rounded-md border-none bg-gray-50 p-3 text-xl text-gray-700 placeholder:text-gray-400 focus:ring-0'
              }
              id={'user-name'}
              placeholder={t('registration.full-name/placeholder')}
              type={'text'}
              value={name}
              onChange={onNameChange}
            />
            <div className={'flex items-center justify-end gap-5'}>
              <Button kind={'success'} size={'sm'} value={t('common/done')} onClick={onComplete} />
            </div>
          </form>
        </div>
      </ModalPanel>
    </Modal>
  );
});

export const UserRegistration = suspensify(() => {
  const sessionExists = useValue('auth.session/exists');

  return sessionExists ? <UserRegistration_ /> : null;
});
