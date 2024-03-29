import { Button } from '@elements/components/button';
import { Modal, ModalHeader, ModalPanel } from '@elements/components/modal';
import { Spinner } from '@elements/components/spinner';
import { useDispatch, useValue } from '@elements/store/interface';
import { useTranslation } from '@elements/translation';
import React, { useCallback } from 'react';

export const SignIn = () => {
  const t = useTranslation();
  const visible = useValue('auth.sign-in/visible');
  const sendingOtp = useValue('auth.sign-in/sending-otp');
  const email = useValue('auth.sign-in/email');

  const onSendOtp = useDispatch('auth.sign-in/send-otp');
  const onClose = useDispatch('auth.sign-in/close');
  const onEmailChange = useDispatch('auth.sign-in/update-email');

  const onEmailChangeMemo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onEmailChange({ value: e.target.value });
    },
    [onEmailChange]
  );

  const onFormSubmitMemo = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSendOtp({ email });
    },
    [onSendOtp, email]
  );

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex flex-col gap-9 p-6'}>
          <ModalHeader title={t('common/welcome-to-aktopia')} onClose={onClose} />
          <form className={'flex flex-col gap-5'} onSubmit={onFormSubmitMemo}>
            <div className={'flex flex-col gap-7'}>
              <p className={'text-gray-500 text-sm'}>{t('auth.sign-in.modal/sign-in-or-up')}</p>
              <div className={'flex flex-col gap-3'}>
                <label className={'text-base font-medium text-gray-600'} htmlFor={'signin-email'}>
                  {t('common/email')}
                </label>
                <input
                  className={
                    'focus:outline-4 h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner'
                  }
                  disabled={sendingOtp}
                  id={'signin-email'}
                  inputMode={'email'}
                  type={'email'}
                  value={email}
                  onChange={onEmailChangeMemo}
                />
              </div>
            </div>
            <div className={'flex w-full justify-center mt-5'}>
              {sendingOtp ? (
                <Spinner kind={'primary'} size={'sm'} visible={true} />
              ) : (
                <Button kind={'primary'} size={'md'} type={'submit'} value={t('auth/send-otp')} />
              )}
            </div>
          </form>
        </div>
      </ModalPanel>
    </Modal>
  );
};

/*
Mobile responsive
Agree to terms and conditions
Phone Input component
Email Input component
Email validations
Phone validations
Send Otp disabled until valid phone or email
Error messages
*/
