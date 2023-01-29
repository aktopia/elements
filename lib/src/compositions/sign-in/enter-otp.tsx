import { BackIconButton } from '@elements/components';
import { Button } from '@elements/components/button';
import { Modal } from '@elements/components/modal';
import { Spinner } from '@elements/components/spinner';
import { cva } from 'cva';
import React, { type MouseEventHandler, useCallback } from 'react';

type EnterOtpProps = {
  onOtpChange: (value: string) => void;
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
  otpErrorText?: string;
  onOtpFocus: (e: React.FocusEvent) => void;
};

const inputVariant = cva(
  'h-max rounded-md border bg-gray-50 py-2 px-3 text-center text-2xl font-medium tracking-[1rem] text-gray-600 shadow-inner',
  {
    variants: {
      error: {
        true: 'border-rose-400 focus:ring-0 focus:border-rose-400 border-2',
        false: 'border-gray-300',
      },
    },
  }
);

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
  otpErrorText,
  onOtpFocus,
}: EnterOtpProps) => {
  const onOtpChangeMemo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onOtpChange(e.target.value);
  }, []);

  let resendOtpView;

  if (resendOtpState === 'waiting') {
    resendOtpView = <p className={'text-xs text-gray-500'}>{waitToSendOtpText}</p>;
  } else if (resendOtpState === 'resending') {
    resendOtpView = (
      <div className={'flex items-center justify-center'}>
        <Spinner kind={'secondary'} show={true} size={'xs'} />
      </div>
    );
  } else {
    resendOtpView = (
      <Button
        disabled={verifyingOtp}
        kind={'tertiary'}
        size={'xs'}
        value={resendOtpText}
        onClick={onResendOtp}
      />
    );
  }

  return (
    <Modal show={show} title={titleText} onClose={onClose}>
      <div className={'flex w-[280px] flex-col items-center justify-center gap-5'}>
        {verifyingOtp ? (
          <Spinner kind={'primary'} show={true} size={'sm'} />
        ) : (
          <div className={'h-20'}>
            <div className={'mt-2'}>
              <input
                className={inputVariant({ error: Boolean(otpErrorText) })}
                disabled={resendOtpState == 'resending'}
                maxLength={num}
                type={'text'}
                value={otp}
                onChange={onOtpChangeMemo}
                onFocus={onOtpFocus}
              />
            </div>
            {!!otpErrorText && (
              <div className={'pt-1 text-xs font-medium text-rose-500'}>{otpErrorText}</div>
            )}
          </div>
        )}
        <div className={'relative flex w-full items-center justify-center'}>
          <div className={'absolute left-0'}>
            <BackIconButton size={'xs'} onClick={onBack} />
          </div>
          <div className={'flex items-center justify-center'}>{resendOtpView}</div>
        </div>
      </div>
    </Modal>
  );
};

/*
TODO
- fixed heights for desktop and mobile to prevent jarring resizes
- Shaking error on Wrong Otp
- Successfully logged in state
- OTP input
 */
