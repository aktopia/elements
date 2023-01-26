import { PlusMiniSolid } from '@elements/_icons';
import { Button, ButtonProps } from '@elements/components/button';
import { memo } from 'react';

type SaveButtonProps = Omit<ButtonProps, 'value' | 'Icon'>;

export const SaveButton = memo(({ clicked, ...props }: SaveButtonProps) => {
  return (
    <Button
      {...props}
      clicked={clicked}
      value={clicked ? 'Saved' : 'Save'}
      Icon={PlusMiniSolid}></Button>
  );
});
