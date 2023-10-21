import { suspensify } from '@elements/components/suspensify';
import { NavBar } from '@elements/compositions/nav-bar';
import type { ComponentType } from 'react';
import { Snackbar } from '@elements/compositions/snackbar';
import { UserRegistration } from '@elements/compositions/auth/user-registration';
import { ConfirmationModal } from '@elements/compositions/confirmation-modal';
import { Footer } from '@elements/compositions/footer';

export const wrapPage = (Component: ComponentType) =>
  suspensify((props) => {
    return (
      <>
        <div className={'relative h-full w-full bg-white'}>
          <div className={'z-navbar sticky top-0'}>
            <NavBar />
          </div>
          <div className={'px-4 pb-8 pt-10 w-full mx-auto lg:w-4/5 md:w-11/12 md:pt-14 pb-48'}>
            <Component {...props} />
          </div>
          <Footer />
        </div>

        <UserRegistration />
        <Snackbar />
        <ConfirmationModal />
      </>
    );
  });
