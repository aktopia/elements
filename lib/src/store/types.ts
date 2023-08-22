import { Events as CommentEvents, Subs as CommentSubs } from '@elements/logic/comment';
import { Events as UpdateEvents, Subs as UpdateSubs } from '@elements/logic/update';

export type Sub = {
  params: Record<string, any>;
  result: any;
};

export type Subs = CommentSubs & UpdateSubs;

export type Events = CommentEvents & UpdateEvents;
