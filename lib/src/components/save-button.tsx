import { BookmarkOutline } from '@elements/icons';
import type { ButtonProps } from '@elements/components/button';
import { Button } from '@elements/components/button';
import { memo } from 'react';

type SaveButtonProps = Omit<ButtonProps, 'value' | 'Icon'>;

export const SaveButton = memo(({ clicked, ...props }: SaveButtonProps) => {
  return (
    <Button
      {...props}
      Icon={BookmarkOutline}
      clicked={clicked}
      iconClassName={'stroke-2'}
      value={clicked ? 'Saved' : 'Save'}
    />
  );
});
