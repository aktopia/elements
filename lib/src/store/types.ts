import { Events as CommentEvents, Subs as CommentSubs } from '@elements/logic/comment';
import { Events as UpdateEvents, Subs as UpdateSubs } from '@elements/logic/update';
import { Events as TextEditorEvents, Subs as TextEditorSubs } from '@elements/logic/text-editor';
import { Subs as UserSubs } from '@elements/logic/user';

export type Sub = {
  params: Record<string, any>;
  result: any;
};

export type Subs = CommentSubs & UpdateSubs & TextEditorSubs & UserSubs;

export type Events = CommentEvents & UpdateEvents & TextEditorEvents;
