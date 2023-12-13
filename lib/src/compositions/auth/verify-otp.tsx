import { BackIconButton } from '@elements/components/back-icon-button';
import { Button } from '@elements/components/button';
import { Modal, ModalHeader, ModalPanel } from '@elements/components/modal';
import { Spinner } from '@elements/components/spinner';
import { useDispatch, useValue } from '@elements/store/interface';
import { useTranslation } from '@elements/translation';
import { cva } from '@elements/utils/style';
import { useCallback, type ChangeEvent } from 'react';
import { MAX_OTP_DIGITS } from '@elements/logic/authentication';
import { suspensify } from '@elements/components/suspensify';
import { CheckCircleSolid } from '@elements/icons';

const inputVariant = cva(
  'h-max w-full rounded-md border bg-gray-50 py-2 px-3 text-center text-2xl font-medium tracking-[1rem] text-gray-600 shadow-inner',
  {
    variants: {
      error: {
        true: 'border-rose-400 focus:ring-0 focus:border-rose-400 border-2',
        false: 'border-gray-300',
      },
    },
  }
);

export const VerifyOtp = suspensify(() => {
  const t = useTranslation();

  const otp = useValue('auth.verify-otp/otp');
  const visible = useValue('auth.verify-otp/visible');
  const verifyingOtp = useValue('auth.verify-otp/verifying');
  const resendOtpState = useValue('auth.verify-otp/resend-otp-state');
  const otpError = useValue('auth.verify-otp/error');
  const waitSeconds = useValue('auth.verify-otp/wait-seconds');
  const email = useValue('auth.sign-in/email');

  const onResendOtp = useDispatch('auth.verify-otp/resend-otp');
  const onBack = useDispatch('auth.verify-otp/go-back');
  const onClose = useDispatch('auth.verify-otp/close');
  const onOtpChange = useDispatch('auth.verify-otp/update-otp');
  const onOtpFocus = useDispatch('auth.verify-otp/focus-input');
  const verifyOtp = useDispatch('auth.verify-otp/verify-otp');

  const onOtpChangeMemo = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const otp = e.target.value.trim();
      onOtpChange({ value: otp });
    },
    [onOtpChange]
  );

  const onVerifyOtp = useCallback(() => verifyOtp({ otp }), [verifyOtp, otp]);

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
      <ModalPanel>
        <div className={'flex flex-col gap-9 p-6'}>
          <ModalHeader title={t('common/welcome-to-aktopia')} onClose={onClose} />
          {verifyingOtp ? (
            <div className={'flex h-20 w-[360px] items-center justify-center'}>
              <Spinner kind={'primary'} size={'sm'} visible={true} />
            </div>
          ) : (
            <div className={'flex flex-col w-full gap-7'}>
              <div className={'flex gap-1.5 items-center'}>
                <CheckCircleSolid className={'h-5 w-5 text-green-500'} />
                <div className={'flex gap-1 items-center'}>
                  <p className={'text-gray-500 text-sm'}>{t('auth.verify-otp.modal/otp-sent')}</p>
                  <p className={'text-gray-500 font-medium text-sm'}>{email}</p>
                </div>
              </div>
              <form className={'w-[360px] flex flex-col gap-4'} onSubmit={onVerifyOtp}>
                <div className={'flex flex-col gap-3 w-full'}>
                  <label className={'text-base font-medium text-gray-600'} htmlFor={'signin-otp'}>
                    {t('common/otp')}
                  </label>
                  <div>
                    <input
                      autoComplete={'off'}
                      className={inputVariant({ error: Boolean(otpError) })}
                      disabled={resendOtpState == 'resending'}
                      id={'signin-otp'}
                      inputMode={'numeric'}
                      maxLength={MAX_OTP_DIGITS}
                      type={'text'}
                      value={otp}
                      onChange={onOtpChangeMemo}
                      onFocus={onOtpFocus}
                    />
                    {otpError ? (
                      <div className={'pt-1 text-xs font-medium text-rose-500'}>
                        {t('auth/invalid-otp')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={'flex items-center justify-start'}>{resendOtpView}</div>
                <div className={'relative flex w-full items-center justify-center mt-3'}>
                  <div className={'absolute left-0'}>
                    <BackIconButton size={'xs'} onClick={onBack} />
                  </div>
                  <Button
                    kind={'primary'}
                    size={'md'}
                    type={'submit'}
                    value={t('auth/verify-otp')}
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </ModalPanel>
    </Modal>
  );
});

/*
TODO
- fixed heights for desktop and mobile to prevent jarring resizes
- Shaking error on Wrong Otp
- Successfully logged in state
- OTP input
 */
