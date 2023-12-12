import { navigateToPath } from '@elements/utils/router';
import useEvent from 'react-use-event-hook';
import { type AnchorHTMLAttributes, type ForwardedRef, forwardRef, type MouseEvent } from 'react';

export const Link = forwardRef(
  (
    { href, children, onClick, target, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const onClick_ = useEvent((event: MouseEvent<HTMLAnchorElement>) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0)
        return;

      onClick && onClick(event);

      if (target == '_blank') {
        return;
      }

      if (!event.defaultPrevented!) {
        event.preventDefault();
        href && navigateToPath(href);
      }
    });

    return (
      <a href={href} target={target} onClick={onClick_} {...props} ref={ref}>
        {children}
      </a>
    );
  }
);
