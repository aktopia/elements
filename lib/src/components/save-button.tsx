import { PlusMiniSolid } from '@elements/_icons';
import { Button, ButtonProps } from '@elements/components/button';
import { memo } from 'react';

type SaveButtonProps = Omit<ButtonProps, 'value' | 'Icon'>;

export const SaveButton = memo(({ clicked, ...props }: SaveButtonProps) => {
  return (
    <Button {...props} Icon={PlusMiniSolid} clicked={clicked} value={clicked ? 'Saved' : 'Save'} />
  );
});
