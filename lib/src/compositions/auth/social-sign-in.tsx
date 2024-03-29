import { Button } from '@elements/components/button';
import { Modal, ModalHeader, ModalPanel } from '@elements/components/modal';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store/interface';
import { useTranslation } from '@elements/translation';

export const SocialSignIn = suspensify(() => {
  const t = useTranslation();
  const visible = useValue('auth.sign-in/visible');
  // @ts-ignore
  const disallowClose = useValue('auth.sign-in/disallow-close');
  // @ts-ignore
  const onGoogleClick = useDispatch('auth.sign-in.google/initiate');
  const onModalClose = useDispatch('auth.sign-in/close');

  return (
    <Modal visible={visible} onClose={onModalClose}>
      <ModalPanel>
        <div className={'flex-col gap-2 p-6'}>
          <ModalHeader
            title={t('common/sign-in')}
            {...(!disallowClose && { onClose: onModalClose })}
          />
          <div className={'m-6 flex w-40 flex-col items-center'}>
            <Button
              kind={'primary'}
              size={'sm'}
              value={t('auth/sign-in-with-google')}
              onClick={onGoogleClick}
            />
          </div>
        </div>
      </ModalPanel>
    </Modal>
  );
});

// TODO Add suspense spinner instead of lines
