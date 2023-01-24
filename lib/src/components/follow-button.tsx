import { RssMiniSolid } from '@elements/_icons';
import { Button, IButton } from '@elements/components/button';
import { memo } from 'react';

type IFollowButton = Omit<IButton, 'value' | 'Icon'>;

export const FollowButton = memo(({ clicked, ...props }: IFollowButton) => {
  return (
    <Button
      {...props}
      value={clicked ? 'Following' : 'Follow'}
      clicked={clicked}
      Icon={RssMiniSolid}></Button>
  );
});
