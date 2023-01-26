import { RssMiniSolid } from '@elements/_icons';
import { Button, ButtonProps } from '@elements/components/button';
import { memo } from 'react';

type IFollowButton = Omit<ButtonProps, 'value' | 'Icon'>;

export const FollowButton = memo(({ clicked, ...props }: IFollowButton) => {
  return (
    <Button
      {...props}
      value={clicked ? 'Following' : 'Follow'}
      clicked={clicked}
      Icon={RssMiniSolid}></Button>
  );
});
