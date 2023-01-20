import { Modal } from '@elements/components/modal';
import { NamedSwitch } from '@elements/components/named-switch';
import { Button } from '@elements/components/button';
import React, { useCallback } from 'react';
import { Spinner } from '@elements/components/spinner';

interface ISignIn {
  onSendOtp: (e: React.FormEvent) => void;
  onClose: Function;
  show: boolean;
  titleText: string;
  sendOtpText: string;
  phone: string;
  email: string;
  activeSwitch: string;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSwitchClick: Function;
  sendingOtp: boolean;
  switches: any;
}

export const SignIn = ({
  onSendOtp,
  onClose,
  show,
  titleText,
  sendOtpText,
  phone,
  email,
  activeSwitch,
  onSwitchClick,
  onPhoneChange,
  onEmailChange,
  sendingOtp,
  switches,
}: ISignIn) => {
  const onPhoneChangeMemo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onPhoneChange(e.target.value);
  }, []);

  const onEmailChangeMemo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(e.target.value);
  }, []);

  const onFormSubmitMemo = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSendOtp(e);
  }, []);

  return (
    <Modal title={titleText} onClose={onClose} show={show}>
      <form className={'flex flex-col gap-5'} onSubmit={onFormSubmitMemo}>
        <NamedSwitch
          switches={switches}
          variant={{ size: 'sm' }}
          activeSwitch={activeSwitch}
          onSwitchClick={onSwitchClick}
        />
        {activeSwitch == 'phone' ? (
          <input
            value={phone}
            disabled={sendingOtp}
            type={'text'}
            onChange={onPhoneChangeMemo}
            className={
              'h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner'
            }
          />
        ) : (
          <input
            value={email}
            disabled={sendingOtp}
            type={'text'}
            onChange={onEmailChangeMemo}
            className={
              'h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner'
            }
          />
        )}
        <div className={'flex w-full justify-center'}>
          {sendingOtp ? (
            <Spinner show={true} kind="primary" size="sm" />
          ) : (
            <Button type="submit" value={sendOtpText} size="md" kind="primary" />
          )}
        </div>
      </form>
    </Modal>
  );
};

/*
Enter to submit
Mobile responsive
Agree to terms and conditions
Phone Input component
Email Input component
Email validations
Phone validations
Send Otp disabled until valid phone or email
Error messages
*/
