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
  verifyingOtp: boolean;
  num: number;
  waitToSendOtpText?: string;
  resendOtpState: 'resending' | 'waiting' | 'can-resend';
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
  num,
  resendOtpState,
  waitToSendOtpText,
}: IEnterOtp) => {
  let resendOtpView;

  if (resendOtpState == 'waiting') {
    resendOtpView = <p className={'text-xs text-gray-500'}>{waitToSendOtpText}</p>;
  } else if (resendOtpState == 'resending') {
    resendOtpView = (
      <div className={'flex items-center justify-center'}>
        <Spinner variant={{ type: 'secondary', size: 'xs' }} />
      </div>
    );
  } else {
    resendOtpView = (
      <Button
        onClick={onResendOtp}
        value={resendOtpText}
        variant={{ size: 'xs', type: 'tertiary' }}
        disabled={verifyingOtp}
      />
    );
  }

  return (
    <Modal title={titleText} onClose={onClose} show={show}>
      <div className={'flex w-[280px] flex-col items-center justify-center gap-5'}>
        {verifyingOtp ? (
          <Spinner variant={{ type: 'primary', size: 'sm' }} />
        ) : (
          <input
            maxLength={num}
            value={otp}
            disabled={resendOtpState == 'resending'}
            type="text"
            onChange={onOtpChange}
            className={
              'h-max rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-center text-2xl font-medium tracking-[1rem] text-gray-600 shadow-inner'
            }
          />
        )}
        <div className={'relative flex w-full items-center justify-center'}>
          <div className={'absolute left-0'}>
            <BackIconButton variant={{ size: 'xs' }} onClick={onBack} />
          </div>
          <div className={'flex items-center justify-center'}>{resendOtpView}</div>
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
