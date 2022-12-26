import { Modal } from '@elements/components/modal';
import { Button } from '@elements/components/button';
import React, { MouseEventHandler, useCallback } from 'react';
import { BackIconButton } from '@elements/components';
import { Spinner } from '@elements/components/spinner';
import { cva } from 'cva';

interface IEnterOtp {
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
  errorText?: string;
}

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
  errorText,
}: IEnterOtp) => {
  const onOtpChangeMemo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onOtpChange(e.target.value);
  }, []);

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
          <div>
            <input
              maxLength={num}
              value={otp}
              disabled={resendOtpState == 'resending'}
              type="text"
              onChange={onOtpChangeMemo}
              className={inputVariant({ error: !!errorText })}
            />
            {errorText && (
              <div className={'pt-1 text-xs font-medium text-rose-500'}>{errorText}</div>
            )}
          </div>
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
- Shaking error on Wrong Otp
- Successfully logged in state
 */
