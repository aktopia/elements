import { Modal } from '@elements/components/modal';
import { Button } from '@elements/components/button';
import React from 'react';

interface ISignIn {
  onClose: Function;
  show: boolean;
  titleText: string;
  onGoogleClick: React.MouseEventHandler;
}

export const SocialSignIn = ({ onClose, show, onGoogleClick, titleText }: ISignIn) => {
  return (
    <Modal title={titleText} onClose={onClose} show={show}>
      <div className={'m-6 flex w-80 flex-col items-center'}>
        <Button
          onClick={onGoogleClick}
          value={'Google'}
          variant={{ size: 'sm', type: 'primary' }}
        />
      </div>
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
