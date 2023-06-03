import { Button } from '@elements/components/button';
import { Modal } from '@elements/components/modal';
import { useDispatch, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';

export const SocialSignIn = () => {
  const t = useTranslation();
  const visible = useValue<boolean>('auth.sign-in/visible');
  const onGoogleClick = useDispatch('auth.sign-in.google/initiate');
  const onModalClose = useDispatch('auth.sign-in/close');

  return (
    <Modal title={t('common/sign-in')} visible={visible} onClose={onModalClose}>
      <div className={'m-6 flex w-40 flex-col items-center'}>
        <Button
          kind={'primary'}
          size={'sm'}
          value={t('auth/sign-in-with-google')}
          onClick={onGoogleClick}
        />
      </div>
    </Modal>
  );
};
