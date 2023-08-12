import { QrCodeOutline } from '@elements/icons';
import { Button, ButtonProps } from '@elements/components/button';
import { memo } from 'react';

type QRCodeButtonProps = Omit<ButtonProps, 'value' | 'Icon'>;

export const QRCodeButton = memo(({ clicked, ...props }: QRCodeButtonProps) => {
  return (
    <Button
      {...props}
      Icon={QrCodeOutline}
      clicked={clicked}
      iconClassName={'stroke-2'}
      value={'QR Code'}
    />
  );
});
