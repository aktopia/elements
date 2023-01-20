import { Button, IButton } from '@elements/components/button';
import { RssMiniSolid } from '@elements/_icons';

type IFollowButton = Omit<IButton, 'value' | 'Icon'>;

export const FollowButton = ({ clicked, ...props }: IFollowButton) => {
  return (
    <Button
      {...props}
      value={clicked ? 'Following' : 'Follow'}
      clicked={clicked}
      Icon={RssMiniSolid}></Button>
  );
};
