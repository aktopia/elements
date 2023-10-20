import { useIsCompactViewport } from '@elements/store/hooks';
import { FullNavBar } from '@elements/compositions/nav-bar/full-nav-bar';
import { CompactNavBar } from '@elements/compositions/nav-bar/compact-nav-bar';

export const NavBar = () => {
  const isCompactViewport = useIsCompactViewport();
  return isCompactViewport ? <CompactNavBar /> : <FullNavBar />;
};

/*
TODO
React lazy load the components
Think of a way to reuse code between mobile and desktop without over-engineering
 */
