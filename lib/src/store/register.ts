import { StoreApi } from 'zustand';
import { rpcGet } from '@elements/rpc';
import { Events, Subs } from '@elements/store/types';

type Read<T extends keyof Subs> = (args: {
  state: any;
  params: Subs[T]['params'];
}) => Subs[T]['params'];

type AsyncRead<T extends keyof Subs> = (args: {
  params: Subs[T]['params'];
}) => Promise<Subs[T]['params']>;

export type Dispatch<T extends keyof Events> = (args: {
  setState: StoreApi<any>['setState'];
  getState: StoreApi<any>['getState'];
  params: Events[T]['params'];
}) => void;

export const subscriptions: any = {};
export const events: any = {};

export function sub<T extends keyof Subs>(id: T, fn: Read<T>) {
  subscriptions[id] = { fn, async: false };
}

export function asyncSub<T extends keyof Subs>(id: string, fn: AsyncRead<T>) {
  subscriptions[id] = { fn, async: true };
}

export function remoteSub<T extends keyof Subs>(id: T) {
  asyncSub<T>(id, async ({ params }) => {
    return rpcGet(id, params);
  });
}

export function evt<T extends keyof Events>(id: T, fn: Dispatch<T>) {
  events[id] = { fn };
}
