import { Button } from '@elements/components/button';
import { Modal } from '@elements/components/modal';
import { NamedSwitch } from '@elements/components/named-switch';
import { Spinner } from '@elements/components/spinner';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import React, { useCallback, useMemo } from 'react';

export const SignIn = () => {
  const t = useTranslation();
  const visible = useValue<boolean>('auth.sign-in/visible');
  const sendingOtp = useValue<boolean>('auth.sign-in/sending-otp');
  const phone = useValue<string>('auth.sign-in/phone');
  const email = useValue<string>('auth.sign-in/email');
  const activeSwitchId = useValue<string>('auth.sign-in/active-switch-id');

  const switches = useMemo(
    () => [
      { id: 'phone', label: t('common/phone') },
      { id: 'email', label: t('common/email') },
    ],
    [t]
  );

  const onSendOtp = useDispatch('auth.sign-in/send-otp');
  const onClose = useDispatch('auth.sign-in/close');
  const onSwitchClick = useDispatch('auth.sign-in/update-switch');
  const onPhoneChange = useDispatch('auth.sign-in/update-phone');
  const onEmailChange = useDispatch('auth.sign-in/update-email');

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
    <Modal visible={visible} onClose={onClose}>
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
            <Spinner kind={'primary'} size={'sm'} visible={true} />
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
