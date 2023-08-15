import { BackIconButton } from '@elements/components/back-icon-button';
import { Button } from '@elements/components/button';
import { Modal } from '@elements/components/modal';
import { Spinner } from '@elements/components/spinner';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { cva } from 'cva';
import React, { useCallback } from 'react';
import { MAX_OTP_DIGITS, ResendOtpState } from '@elements/logic/authentication';

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

export const VerifyOtp = () => {
  const t = useTranslation();

  const otp = useValue<string>('auth.verify-otp/otp');
  const visible = useValue<boolean>('auth.verify-otp/visible');
  const verifyingOtp = useValue<boolean>('auth.verify-otp/verifying');
  const resendOtpState = useValue<ResendOtpState>('auth.verify-otp/resend-otp-state');
  const otpError = useValue<string>('auth.verify-otp/error');
  const waitSeconds = useValue<string>('auth.verify-otp/wait-seconds');

  const onResendOtp = useDispatch('auth.verify-otp/resend-otp');
  const onBack = useDispatch('auth.verify-otp/go-back');
  const onClose = useDispatch('auth.verify-otp/close');
  const onOtpChange = useDispatch('auth.verify-otp/update-otp');
  const onOtpFocus = useDispatch('auth.verify-otp/focus-input');

  const onOtpChangeMemo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const otp = e.target.value.trim();
      onOtpChange({ value: otp });
    },
    [onOtpChange]
  );

  let resendOtpView;

  if (resendOtpState === 'waiting') {
    resendOtpView = (
      <p className={'text-xs text-gray-500'}>{t('auth/wait-to-resend-otp', { waitSeconds })}</p>
    );
  } else if (resendOtpState === 'resending') {
    resendOtpView = (
      <div className={'flex items-center justify-center'}>
        <Spinner kind={'secondary'} size={'xs'} visible={true} />
      </div>
    );
  } else {
    resendOtpView = (
      <Button
        disabled={verifyingOtp}
        kind={'tertiary'}
        size={'xs'}
        value={t('auth/resend-otp')}
        onClick={onResendOtp}
      />
    );
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className={'flex w-[280px] flex-col items-center justify-center gap-5'}>
        {verifyingOtp ? (
          <Spinner kind={'primary'} size={'sm'} visible={true} />
        ) : (
          <div className={'h-20'}>
            <div className={'mt-2'}>
              <input
                className={inputVariant({ error: Boolean(otpError) })}
                disabled={resendOtpState == 'resending'}
                maxLength={MAX_OTP_DIGITS}
                type={'text'}
                value={otp}
                onChange={onOtpChangeMemo}
                onFocus={onOtpFocus}
              />
            </div>
            {/*TODO handle different otp error cases*/}
            {!!otpError && (
              <div className={'pt-1 text-xs font-medium text-rose-500'}>
                {t('auth/invalid-otp')}
              </div>
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
- Firefox bug
- fixed heights for desktop and mobile to prevent jarring resizes
- Shaking error on Wrong Otp
- Successfully logged in state
- OTP input
 */
