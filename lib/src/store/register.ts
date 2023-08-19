import { StoreApi } from 'zustand';
import isEmpty from 'lodash/isEmpty';

type Read = (args: { state: any; params?: any }) => any;

type AsyncRead<Params, Result> = (args: { params?: Params }) => Promise<Result>;

export type Dispatch = (args: {
  setState: StoreApi<any>['setState'];
  getState: Function;
  params?: any;
  state: any;
}) => void;

export const subscriptions: any = {};
export const events: any = {};

export function sub(id: string, fn: Read) {
  subscriptions[id] = { fn, async: false };
}

export function asyncSub<Params, Result>(id: string, fn: AsyncRead<Params, Result>) {
  subscriptions[id] = { fn, async: true };
}

export function remoteSub<Params, Result>(id: string) {
  asyncSub<Params, Result>(id, async ({ params }) => {
    const key = encodeURIComponent(id);
    const action = 'subscribe';
    const urlJson = isEmpty(params) ? null : encodeURIComponent(JSON.stringify(params));
    const url = `/api/rpc/${key}?action=${action}&json=${urlJson}`;

    const res = await fetch(url);
    const json = await res.json();

    return json.data;
  });
}

export function evt(id: string, fn: Dispatch) {
  events[id] = { fn };
}
