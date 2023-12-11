import { emptyObject, scrollToTop } from '@elements/utils';
import type { Route } from '@elements/routes';
import isEmpty from 'lodash/isEmpty';

export type Params = Record<string, string>;

export interface Match extends Omit<Route, 'matcher'> {
  path: string;
  pathParams: Params;
  queryParams: Params;
  hashParams: Params;
}

export const events = ['popstate', 'pushState', 'replaceState', 'hashchange'];

if (typeof history !== 'undefined') {
  for (const type of ['pushState', 'replaceState']) {
    // @ts-ignore
    const original = history[type];
    // @ts-ignore
    history[type] = function () {
      const result = original.apply(this, arguments);
      const event = new Event(type);
      // @ts-ignore
      event.arguments = arguments;

      dispatchEvent(event);
      return result;
    };
  }
}

const getQueryParams = () => {
  const search = window.location.search;
  return isEmpty(search?.trim())
    ? emptyObject
    : Object.fromEntries([...new URLSearchParams(search)]);
};

const getHashParams = () => {
  const hash = window.location.hash;
  return isEmpty(hash?.trim())
    ? emptyObject
    : Object.fromEntries([...new URLSearchParams(hash.slice(1))]);
};

export const getLocation = () => {
  const path = window.location.pathname;
  return { path, hashParams: getHashParams(), queryParams: getQueryParams() };
};

export const navigateToPath = (path: string, { replace = false } = {}) => {
  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const samePath = currentPath === path;
  replace || samePath ? history.replaceState(null, '', path) : history.pushState(null, '', path);
  scrollToTop({ behavior: 'auto' });
};

export const updateHashParams = (params: Params, { replace = false } = {}) => {
  if (isEmpty(params)) return;
  const hashParams = { ...getHashParams(), ...params };
  const hash = `#${new URLSearchParams(hashParams).toString()}`;
  const newPath = `${window.location.pathname}${window.location.search}${hash}`;
  replace ? history.replaceState(null, '', newPath) : history.pushState(null, '', newPath);
};
