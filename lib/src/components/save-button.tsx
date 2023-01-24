import { PlusMiniSolid } from '@elements/_icons';
import { Button, IButton } from '@elements/components/button';
import { memo } from 'react';

type ISaveButton = Omit<IButton, 'value' | 'Icon'>;

export const SaveButton = memo(({ clicked, ...props }: ISaveButton) => {
  return (
    <Button
      {...props}
      clicked={clicked}
      value={clicked ? 'Saved' : 'Save'}
      Icon={PlusMiniSolid}></Button>
  );
});
