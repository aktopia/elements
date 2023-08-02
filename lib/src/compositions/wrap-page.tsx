import { suspensify } from '@elements/components/suspensify';
import { NavBar } from '@elements/compositions/nav-bar';
import { ComponentType } from 'react';

export const wrapPage = (Component: ComponentType) =>
  suspensify((props) => {
    return (
      <div className={'h-full w-full bg-white'}>
        <NavBar />
        <div className={'p-4 md:px-40 md:py-16'}>
          <Component {...props} />
        </div>
      </div>
    );
  });
