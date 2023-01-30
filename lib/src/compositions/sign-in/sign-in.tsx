import { Button } from '@elements/components/button';
import { Modal } from '@elements/components/modal';
import { NamedSwitch } from '@elements/components/named-switch';
import { Spinner } from '@elements/components/spinner';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import React, { useCallback, useMemo } from 'react';

export const SignIn = ({}) => {
  const t = useTranslation();
  const show = useValue<boolean>('auth.sign-in.modal/visible');
  const sendingOtp = useValue<boolean>('auth.sign-in.modal/sending-otp');
  const phone = useValue<string>('auth.sign-in.modal/phone');
  const email = useValue<string>('auth.sign-in.modal/email');
  const activeSwitchId = useValue<string>('auth.sign-in.modal/active-switch-id');

  const switches = useMemo(
    () => [
      { id: 'phone', label: t('common/phone') },
      { id: 'email', label: t('common/email') },
    ],
    [t]
  );

  const onSendOtp = useDispatch('auth.sign-in.modal/send-otp');
  const onClose = useDispatch('auth.sign-in.modal/close');
  const onSwitchClick = useDispatch('auth.sign-in.modal/update-switch');
  const onPhoneChange = useDispatch('auth.sign-in.modal/update-phone');
  const onEmailChange = useDispatch('auth.sign-in.modal/update-email');

  const onSwitch = useCallback(
    (switchId: string) => {
      onSwitchClick({ 'switch-id': switchId });
    },
    [onSwitchClick]
  );

  const onPhoneChangeMemo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onPhoneChange({ phone: e.target.value });
    },
    [onPhoneChange]
  );

  const onEmailChangeMemo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onEmailChange({ email: e.target.value });
    },
    [onEmailChange]
  );

  const onFormSubmitMemo = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSendOtp();
    },
    [onSendOtp]
  );

  return (
    <Modal show={show} title={t('auth/sign-in')} onClose={onClose}>
      <form className={'flex flex-col gap-5'} onSubmit={onFormSubmitMemo}>
        <NamedSwitch
          activeSwitchId={activeSwitchId}
          size={'md'}
          switches={switches}
          onSwitchClick={onSwitch}
        />
        {activeSwitchId == 'phone' ? (
          <input
            className={
              'h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner'
            }
            disabled={sendingOtp}
            type={'text'}
            value={phone}
            onChange={onPhoneChangeMemo}
          />
        ) : (
          <input
            className={
              'h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner'
            }
            disabled={sendingOtp}
            type={'text'}
            value={email}
            onChange={onEmailChangeMemo}
          />
        )}
        <div className={'flex w-full justify-center'}>
          {sendingOtp ? (
            <Spinner kind={'primary'} show={true} size={'sm'} />
          ) : (
            <Button kind={'primary'} size={'md'} type={'submit'} value={t('auth/send-otp')} />
          )}
        </div>
      </form>
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
