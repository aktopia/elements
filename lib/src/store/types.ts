import { Events as CommentEvents, Subs as CommentSubs } from '@elements/logic/comment';
import { Events as UpdateEvents, Subs as UpdateSubs } from '@elements/logic/update';
import { Events as TextEditorEvents, Subs as TextEditorSubs } from '@elements/logic/text-editor';
import { Subs as UserSubs } from '@elements/logic/user';
import { Events as VotingEvents, Subs as VotingSubs } from '@elements/logic/voting';
import {
  Events as AuthenticationEvents,
  Subs as AuthenticationSubs,
} from '@elements/logic/authentication';

export type Sub = {
  params: Record<string, any>;
  result: any;
};

export type Subs = CommentSubs &
  UpdateSubs &
  TextEditorSubs &
  UserSubs &
  VotingSubs &
  AuthenticationSubs;

export type Events = CommentEvents &
  UpdateEvents &
  TextEditorEvents &
  VotingEvents &
  AuthenticationEvents;
