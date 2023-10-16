import { suspensify } from '@elements/components/suspensify';
import { NavBar } from '@elements/compositions/nav-bar';
import type { ComponentType } from 'react';
import { Snackbar } from '@elements/compositions/snackbar';
import { UserRegistration } from '@elements/compositions/auth/user-registration';
import { ConfirmationModal } from '@elements/compositions/confirmation-modal';
import { MakeUsBetter } from '@elements/components/make-us-better';
import { useValue } from '@elements/store';

export const wrapPage = (Component: ComponentType) =>
  suspensify((props) => {
    const makeUsBetterVisible = useValue('meta.portal.link/visible');

    return (
      <>
        <div className={'relative h-full w-full bg-white'}>
          <div className={'z-navbar sticky top-0'}>
            <NavBar />
          </div>
          {makeUsBetterVisible ? (
            <div className={'fixed z-popover left-1/2 top-20 mx-auto'}>
              <MakeUsBetter />
            </div>
          ) : null}
          <div className={'p-4 md:px-40 md:pt-14'}>
            <Component {...props} />
          </div>
        </div>

        <UserRegistration />
        <Snackbar />
        <ConfirmationModal />
      </>
    );
  });
