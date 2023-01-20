import { Button, IButton } from '@elements/components/button';
import { RssMiniSolid } from '@elements/_icons';

type IFollowButton = Omit<IButton, 'value' | 'icon'>;

export const FollowButton = ({ ...props }: IFollowButton) => {
  return <Button {...props} value={'Follow'} Icon={RssMiniSolid}></Button>;
};
