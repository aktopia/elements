import React from 'react';

export const SingleCharacterInput = React.forwardRef<HTMLInputElement, any>(
  ({ value }: any, ref) => {
    return (
      <input
        ref={ref}
        type={'text'}
        maxLength={1}
        value={value}
        className="h-10 w-10 rounded-lg border border-gray-200 bg-gray-50 text-center text-lg text-gray-700 shadow-inner"
      />
    );
  }
);

/*
TODO
Mobile responsiveness
 */
