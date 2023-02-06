import { BackIconButton } from '@elements/components';
import { Button } from '@elements/components/button';
import { Modal } from '@elements/components/modal';
import { Spinner } from '@elements/components/spinner';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { cva } from 'cva';
import React, { useCallback } from 'react';

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
  const otp = useValue<string>('auth.enter-otp/otp');
  const show = useValue<boolean>('auth.enter-otp/visible');
  const verifyingOtp = useValue<boolean>('auth.enter-otp/verifying');
  const maxDigits = useValue<number>('auth.enter-otp/max-otp-digits');
  const resendOtpState = useValue<string>('auth.enter-otp/resend-otp-state');
  const otpError = useValue<string>('auth.enter-otp/error');
  const waitSeconds = useValue<string>('auth.enter-otp/wait-seconds');
  const onResendOtp = useDispatch('auth.enter-otp/resend-otp');
  const onBack = useDispatch('auth.enter-otp/go-back');
  const onClose = useDispatch('auth.enter-otp/close');
  const onOtpChange = useDispatch('auth.enter-otp/update-otp');
  const onOtpFocus = useDispatch('auth.enter-otp/focus-input');

  const onOtpChangeMemo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onOtpChange({ otp: e.target.value });
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
        <Spinner kind={'secondary'} show={true} size={'xs'} />
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
    <Modal show={show} title={t('auth/enter-otp')} onClose={onClose}>
      <div className={'flex w-[280px] flex-col items-center justify-center gap-5'}>
        {verifyingOtp ? (
          <Spinner kind={'primary'} show={true} size={'sm'} />
        ) : (
          <div className={'h-20'}>
            <div className={'mt-2'}>
              <input
                className={inputVariant({ error: Boolean(otpError) })}
                disabled={resendOtpState == 'resending'}
                maxLength={maxDigits}
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
