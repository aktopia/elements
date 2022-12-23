import { Modal } from '@elements/components/modal';
import { NamedSwitch } from '@elements/components/named-switch';
import { Button } from '@elements/components/button';
import React, { ChangeEventHandler, MouseEventHandler } from 'react';

interface ISignIn {
  onSendOtp: MouseEventHandler<HTMLButtonElement>;
  onClose: Function;
  show: boolean;
  titleText: string;
  sendOtpText: string;
  phone: string;
  email: string;
  activeSwitch: string;
  phoneSwitchText: string;
  emailSwitchText: string;
  onPhoneChange: ChangeEventHandler<HTMLInputElement>;
  onEmailChange: ChangeEventHandler<HTMLInputElement>;
  onSwitchClick: Function;
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
  phoneSwitchText,
  emailSwitchText,
  onPhoneChange,
  onEmailChange,
}: ISignIn) => {
  const opts = [
    { id: 'phone', label: phoneSwitchText },
    { id: 'email', label: emailSwitchText },
  ];

  return (
    <Modal title={titleText} onClose={onClose} show={show}>
      <div className={'flex flex-col gap-5'}>
        <NamedSwitch
          options={opts}
          variant={{ size: 'sm' }}
          activeSwitch={activeSwitch}
          onSwitchClick={onSwitchClick}
        />
        {activeSwitch == 'phone' ? (
          <input
            value={phone}
            type={'text'}
            onChange={onPhoneChange}
            className={
              'h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner'
            }
          />
        ) : (
          <input
            value={email}
            type={'text'}
            onChange={onEmailChange}
            className={
              'h-max w-[360px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-xl font-medium text-gray-600 shadow-inner'
            }
          />
        )}
        <div className={'flex w-full justify-center'}>
          <Button
            onClick={onSendOtp}
            value={sendOtpText}
            variant={{ size: 'sm', type: 'primary' }}
          />
        </div>
      </div>
    </Modal>
  );
};

/*
Loading for get otp
Mobile responsive
Phone Input component
Email Input component
Email validations
Phone validations
Send Otp disabled until valid phone or email
Error messages
*/
