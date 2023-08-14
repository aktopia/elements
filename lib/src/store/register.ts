type Read = (state: any, params?: Record<string, any>) => any;
type AsyncRead = (params?: Record<string, any>) => any;
export type Dispatch = (set: Function, params?: any) => void;

export const subscriptions: any = {};
export const events: any = {};

export function sub(id: string, fn: Read) {
  subscriptions[id] = { fn, async: false };
}

export function asyncSub(id: string, fn: AsyncRead) {
  subscriptions[id] = { fn, async: true };
}

export function evt(id: string, fn: Dispatch) {
  events[id] = { fn };
}
