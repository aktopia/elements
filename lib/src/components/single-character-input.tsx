import React from 'react';

export const SingleCharacterInput = React.forwardRef<HTMLInputElement, any>(
  ({ value }: any, ref) => {
    return (
      <input
        ref={ref}
        className={'h-10 w-10 rounded-lg border border-gray-200 bg-gray-50 text-center text-lg text-gray-700 shadow-inner'}
        maxLength={1}
        type={'text'}
        value={value}
      />
    );
  }
);

/*
TODO
Mobile responsiveness
 */
