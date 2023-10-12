import { cva } from 'cva';
import { ExclamationCircleMiniSolid } from '@elements/icons';

const variant = cva('w-full bg-gray-100 text-gray-700 placeholder:text-gray-400 ', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl p-3',
    },
    hasError: {
      true: 'border-red-600 border-2 focus:border-2 focus:border-red-600 rounded-t-md rounded-br-md focus:ring-0 bg-red-50',
      false: 'rounded-md default-focus border-none',
    },
  },
});

export const TextInput = ({ size, error, ...props }: any) => {
  const hasError = !!error;

  return (
    <div>
      <input {...props} className={variant({ size, hasError })} type={'text'} />
      {hasError ? (
        <div
          className={
            'flex gap-1.5 h-max w-max bg-red-500 text-white rounded-b-md pr-2 pl-1.5 pt-1 pb-1.5'
          }>
          <ExclamationCircleMiniSolid className={'text-white h-4 w-4'} />
          <p className={'text-xs font-semibold'}>{error}</p>
        </div>
      ) : null}
    </div>
  );
};
