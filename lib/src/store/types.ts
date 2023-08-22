import { Events as CommentEvents, Subs as CommentSubs } from '@elements/logic/comment';

export type Sub = {
  params: Record<string, any>;
  result: any;
};

export type Subs = CommentSubs;

export type Events = CommentEvents;
