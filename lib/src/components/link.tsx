import { navigateToPath } from '@elements/router';
import { type AnchorHTMLAttributes, type MouseEvent, type ReactNode, useCallback } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
}

// WIP, DOESN'T WORK, DON'T USE
export const Link = ({ to, children, ...props }: LinkProps) => {
  const onClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Check for left click
      if (e.button !== 0) return;

      // Allow opening links in a new tab/window
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;

      e.preventDefault();
      navigateToPath(to);
    },
    [to]
  );

  return (
    <a href={to} onClick={onClick} {...props}>
      {children}
    </a>
  );
};

/*
TODO
Make this work
 */
