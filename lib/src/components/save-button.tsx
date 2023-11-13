import { BookmarkOutline } from '@elements/icons';
import type { ButtonProps } from '@elements/components/button';
import { Button } from '@elements/components/button';
import { type ForwardedRef, forwardRef, memo } from 'react';

type SaveButtonProps = Omit<ButtonProps, 'value' | 'Icon'>;

const SaveButton_ = forwardRef(
  ({ clicked, ...props }: SaveButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <Button
        {...props}
        ref={ref}
        Icon={BookmarkOutline}
        clicked={clicked}
        iconClassName={'stroke-2'}
        value={clicked ? 'Saved' : 'Save'}
      />
    );
  }
);

export const SaveButton = memo(SaveButton_);
