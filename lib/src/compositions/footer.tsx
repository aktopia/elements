import { MakeUsBetter } from '@elements/components/make-us-better';

const Copyright = () => {
  const year = new Date().getFullYear();
  const copyright = `© ${year} Aktopia. All rights reserved.`;
  return (
    <div className={'flex justify-center'}>
      <p className={'text-white text-xs'}>{copyright}</p>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className={'bg-gradient-to-br from-blue-800 to-blue-600 w-full py-6'}>
      <div className={'flex justify-center'}>
        <MakeUsBetter />
      </div>
      <Copyright />
    </footer>
  );
};
