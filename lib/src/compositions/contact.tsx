import { wrapPage } from '@elements/compositions/wrap-page';
import { useTranslation } from '@elements/translation';
import whatsappContactQr from '@elements/assets/whatsapp-contact-qr.jpg';
import telegramContactQr from '@elements/assets/telegram-contact-qr.jpg';

const EMAIL = 'hi@aktopia.com';
const PHONE = '+91 99434198796';
const WHATSAPP = 'https://wa.me/+919943418796';
const TELEGRAM = 'https://t.me/+919943418796';

export const Contact = wrapPage(() => {
  const header = 'We listen intently.';
  const t = useTranslation();
  return (
    <main className={'flex flex-col gap-9 items-center'}>
      <h1 className={'text-3xl text-gray-800'}>{header}</h1>
      <div className={'grid grid-cols-2 grid-rows-2 gap-10'}>
        <div className={'flex-col flex items-center justify-center gap-2'}>
          <label className={'text-gray-500 text-sm font-medium'}>{t('common/email')}</label>
          <a className={'text-xl font-medium text-blue-600 underline'} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
        <div className={'flex-col flex items-center justify-center gap-2'}>
          <label className={'text-gray-500 text-sm font-medium'}>{t('common/phone')}</label>
          <a className={'text-xl font-medium text-blue-600 underline'} href={`tel:${PHONE}`}>
            {PHONE}
          </a>
        </div>
        <div className={'flex-col flex items-center justify-center gap-3'}>
          <label className={'text-gray-500 text-sm font-medium'}>{t('common/whatsapp')}</label>
          <a
            className={'text-xl font-medium text-blue-600 underline'}
            href={WHATSAPP}
            rel={'noreferrer'}
            target={'_blank'}>
            <img alt={'whatsapp-contact-qr-code'} className={'h-32 w-32'} src={whatsappContactQr} />
          </a>
        </div>
        <div className={'flex-col flex items-center justify-center gap-3'}>
          <label className={'text-gray-500 text-sm font-medium'}>{t('common/telegram')}</label>
          <a
            className={'text-xl font-medium text-blue-600 underline'}
            href={TELEGRAM}
            rel={'noreferrer'}
            target={'_blank'}>
            <img alt={'telegram-contact-qr-code'} className={'h-32 w-32'} src={telegramContactQr} />
          </a>
        </div>
      </div>
    </main>
  );
});
