import { QrCodeOutline } from '@elements/icons';
import type { ButtonProps } from '@elements/components/button';
import { Button } from '@elements/components/button';
import { type ForwardedRef, forwardRef, memo } from 'react';

type QRCodeButtonProps = Omit<ButtonProps, 'value' | 'Icon'>;

const ShareButton_ = forwardRef(
  ({ clicked, ...props }: QRCodeButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <Button
        {...props}
        ref={ref}
        Icon={QrCodeOutline}
        clicked={clicked}
        iconClassName={'stroke-2'}
        value={'QR Code'}
      />
    );
  }
);

export const ShareButton = memo(ShareButton_);
