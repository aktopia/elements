import { MakeUsBetter } from '@elements/components/make-us-better';
import { Link } from '@elements/components/link';

const Copyright = () => {
  const year = new Date().getFullYear();
  const copyright = `© ${year} Aktopia. All rights reserved.`;
  return (
    <div className={'flex justify-center'}>
      <p className={'text-white text-xs'}>{copyright}</p>
    </div>
  );
};

export const ContactUs = () => {
  const text = 'Contact Us';
  return (
    <Link className={'hover:underline decoration-white text-lg text-white'} href={'/contact'}>
      {text}
    </Link>
  );
};

export const PrivacyPolicy = () => {
  const text = 'Privacy Policy';
  return (
    <Link
      className={'hover:underline decoration-white text-xs text-white px-2'}
      href={'/privacy-policy'}>
      {text}
    </Link>
  );
};

export const TermsOfService = () => {
  const text = 'Terms of Service';
  return (
    <Link
      className={'hover:underline decoration-white text-xs text-white px-2'}
      href={'/terms-of-service'}>
      {text}
    </Link>
  );
};

export const Footer = () => {
  return (
    <footer
      className={'bg-gradient-to-br from-blue-800 to-blue-600 w-full py-6 flex-col flex gap-7'}>
      <div className={'flex flex-col items-center gap-7'}>
        <MakeUsBetter />
        <ContactUs />
        <div className={'flex divide-x'}>
          <PrivacyPolicy />
          <TermsOfService />
        </div>
      </div>
      <Copyright />
    </footer>
  );
};
