import { NavBar } from '@elements/compositions/nav-bar';
import { ComponentType, memo } from 'react';

export const wrapPage = (Component: ComponentType) =>
  memo((props) => {
    return (
      <div className={'h-full w-full bg-white'}>
        <NavBar />
        <div className={'p-6 md:p-14'}>
          <Component {...props} />
        </div>
      </div>
    );
  });
