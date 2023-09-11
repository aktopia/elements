import { suspensify } from '@elements/components/suspensify';
import { NavBar } from '@elements/compositions/nav-bar';
import type { ComponentType } from 'react';
import { Snackbar } from '@elements/compositions/snackbar';
import { UserRegistration } from '@elements/compositions/auth/user-registration';

export const wrapPage = (Component: ComponentType) =>
  suspensify((props) => {
    return (
      <div className={'h-full w-full bg-white'}>
        <NavBar />
        <UserRegistration />
        <Snackbar suspenseLines={5} />
        <div className={'p-4 md:px-40 md:pt-28'}>
          <Component {...props} />
        </div>
      </div>
    );
  });
