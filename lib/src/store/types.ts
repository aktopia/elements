import { Events as CommentEvents, Subs as CommentSubs } from '@elements/logic/comment';
import { Events as UpdateEvents, Subs as UpdateSubs } from '@elements/logic/update';
import { Events as TextEditorEvents, Subs as TextEditorSubs } from '@elements/logic/text-editor';
import { Subs as UserSubs } from '@elements/logic/user';
import { Events as VotingEvents, Subs as VotingSubs } from '@elements/logic/voting';
import {
  Events as AuthenticationEvents,
  Subs as AuthenticationSubs,
} from '@elements/logic/authentication';
import { Events as ProfileEvents, Subs as ProfileSubs } from '@elements/logic/profile';
import { Events as RouterEvents, Subs as RouterSubs } from '@elements/logic/router';
import { Events as ActionEvents, Subs as ActionSubs } from '@elements/logic/action';
import { Events as AlertEvents, Subs as AlertSubs } from '@elements/logic/alert';
import { Events as AppEvents, Subs as AppSubs } from '@elements/logic/app';
import { Events as LocaleEvents, Subs as LocaleSubs } from '@elements/logic/locale';
import { Events as MainSearchEvents, Subs as MainSearchSubs } from '@elements/logic/main-search';

export type Subs = CommentSubs &
  UpdateSubs &
  TextEditorSubs &
  UserSubs &
  VotingSubs &
  AuthenticationSubs &
  ProfileSubs &
  RouterSubs &
  ActionSubs &
  AlertSubs &
  AppSubs &
  LocaleSubs &
  MainSearchSubs;

export type Events = CommentEvents &
  UpdateEvents &
  TextEditorEvents &
  VotingEvents &
  AuthenticationEvents &
  ProfileEvents &
  RouterEvents &
  ActionEvents &
  AlertEvents &
  AppEvents &
  LocaleEvents &
  MainSearchEvents;
