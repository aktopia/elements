import { Header } from '@elements/compositions/header';
import { ComponentType, memo } from 'react';

export const wrapPage = (Component: ComponentType) =>
  memo((props) => {
    return (
      <div>
        <Header />
        <Component {...props} />
      </div>
    );
  });
