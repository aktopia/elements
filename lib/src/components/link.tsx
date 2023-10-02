import { navigateToPath } from '@elements/router';
import useEvent from 'react-use-event-hook';
import { forwardRef } from 'react';

export const Link = forwardRef(({ href, children, onClick, ...props }: any, ref) => {
  const onClick_ = useEvent((event: any) => {
    // ignores the navigation when clicked using right mouse button or
    // by holding a special modifier key: ctrl, command, win, alt, shift
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0)
      return;

    onClick && onClick(event);
    if (!event.defaultPrevented) {
      event.preventDefault();
      navigateToPath(href);
    }
  });

  return (
    <a href={href} onClick={onClick_} {...props} ref={ref}>
      {children}
    </a>
  );
});
