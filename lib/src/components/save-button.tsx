import { Button, IButton } from '@elements/components/button';
import { PlusMiniSolid } from '@elements/_icons';

type ISaveButton = Omit<IButton, 'value' | 'Icon'>;

export const SaveButton = ({ clicked, ...props }: ISaveButton) => {
  return (
    <Button
      {...props}
      clicked={clicked}
      value={clicked ? 'Saved' : 'Save'}
      Icon={PlusMiniSolid}></Button>
  );
};
