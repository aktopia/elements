import { Modal } from '@elements/components/modal';
import { Button } from '@elements/components/button';
import React, { MouseEventHandler } from 'react';
import { BackIconButton, OtpInput } from '@elements/components';
import { Spinner } from '@elements/components/spinner';

interface IEnterOtp {
  onOtpInputComplete: (charArray: string[]) => void;
  onBack: MouseEventHandler<HTMLButtonElement>;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onResendOtp: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
  titleText: string;
  resendOtpText: string;
  resendingOtp: boolean;
  verifyingOtp: boolean;
}

export const EnterOtp = ({
  onOtpInputComplete,
  onClose,
  onBack,
  onResendOtp,
  show,
  titleText,
  resendOtpText,
  verifyingOtp,
  resendingOtp,
}: IEnterOtp) => {
  return (
    <Modal title={titleText} onClose={onClose} show={show}>
      <div className={'flex flex-col items-center justify-center gap-5'}>
        {verifyingOtp ? (
          <Spinner variant={{ type: 'primary', size: 'sm' }} />
        ) : (
          <OtpInput num={6} onInputComplete={onOtpInputComplete} />
        )}
        <div className={'grid w-full grid-cols-3 items-center'}>
          <div>
            <BackIconButton variant={{ size: 'xs' }} onClick={onBack} />
          </div>
          <div className={'flex items-center justify-center'}>
            {resendingOtp ? (
              <div className={'flex items-center justify-center'}>
                <Spinner variant={{ type: 'secondary', size: 'xs' }} />
              </div>
            ) : (
              <Button
                onClick={onResendOtp}
                value={resendOtpText}
                variant={{ size: 'xs', type: 'tertiary' }}
                disabled={verifyingOtp}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

/*
TODO
- Check if a lib exists for OTP input - github otp input
- Controlled component
- Fixed width on input when loading and input
- Timeout and Timeout until Resend OTP is enabled again
- Shaking error on Wrong Otp
- Successfully logged in state
 */
