import { Modal } from '@elements/components/modal';
import { Button } from '@elements/components/button';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import { BackIconButton } from '@elements/components';
import { Spinner } from '@elements/components/spinner';

interface IEnterOtp {
  onOtpChange: ChangeEventHandler<HTMLInputElement>;
  otp: string;
  onBack: MouseEventHandler<HTMLButtonElement>;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onResendOtp: MouseEventHandler<HTMLButtonElement>;
  show: boolean;
  titleText: string;
  resendOtpText: string;
  resendingOtp: boolean;
  verifyingOtp: boolean;
  num: number;
}

export const EnterOtp = ({
  onOtpChange,
  otp,
  onClose,
  onBack,
  onResendOtp,
  show,
  titleText,
  resendOtpText,
  verifyingOtp,
  resendingOtp,
  num,
}: IEnterOtp) => {
  return (
    <Modal title={titleText} onClose={onClose} show={show}>
      <div className={'flex flex-col items-center justify-center gap-5'}>
        {verifyingOtp ? (
          <Spinner variant={{ type: 'primary', size: 'sm' }} />
        ) : (
          <input
            maxLength={num}
            value={otp}
            disabled={resendingOtp}
            type="text"
            onChange={onOtpChange}
            className={
              'h-max w-[280px] rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-center text-2xl font-medium tracking-[1rem] text-gray-600 shadow-inner'
            }
          />
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
- Controlled component
- Fixed width on input when loading and input
- Timeout and Timeout until Resend OTP is enabled again
- Shaking error on Wrong Otp
- Successfully logged in state
 */
