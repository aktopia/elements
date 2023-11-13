import { RssMiniSolid } from '@elements/icons';
import type { ButtonProps } from '@elements/components/button';
import { Button } from '@elements/components/button';
import { type ForwardedRef, forwardRef, memo } from 'react';

type FollowButtonProps = Omit<ButtonProps, 'value' | 'Icon'>;

const FollowButton_ = forwardRef(
  ({ clicked, ...props }: FollowButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <Button
        {...props}
        ref={ref}
        Icon={RssMiniSolid}
        clicked={clicked}
        value={clicked ? 'Following' : 'Follow'}
      />
    );
  }
);

export const FollowButton = memo(FollowButton_);
