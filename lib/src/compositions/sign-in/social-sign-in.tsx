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
    <Modal show={show} title={titleText} onClose={onClose}>
      <div className={'m-6 flex w-80 flex-col items-center'}>
        <Button kind={'primary'} size={'sm'} value={'Google'} onClick={onGoogleClick} />
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
