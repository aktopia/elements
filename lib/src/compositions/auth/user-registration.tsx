import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { useDispatch, useValue } from '@elements/store/interface';
import React, { useCallback } from 'react';
import { Modal, ModalPanel, ModalTitle } from '@elements/components/modal';
import { Button } from '@elements/components/button';

export const UserRegistration = suspensify(({}) => {
  const t = useTranslation();

  /* TODO This is very imperative, view should not know of the name being null,
   instead it should be all the registrations fields that are incomplete
   directly sent from the backend.
   */
  const currentUserName = useValue('current.user/name');
  const isSignedIn = useValue('auth.session/exists');
  const visible = !currentUserName && isSignedIn;
  const name = useValue('user.registration.input/name');

  const onComplete = useDispatch('user.registration.modal/done');
  const updateName = useDispatch('user.registration.input.name/update');

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
            {'Welcome to Aktopia!'}
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
