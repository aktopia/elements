import { cva } from 'cva';

const variant = cva(
  'w-full rounded-md border-none bg-gray-100 text-gray-700 placeholder:text-gray-400 ',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl p-3',
      },
    },
  }
);

export const TextInput = ({ size, ...props }: any) => {
  return (
    <div>
      <input {...props} className={variant({ size })} type={'text'} />
    </div>
  );
};
