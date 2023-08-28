import type { Events as CommentEvents, Subs as CommentSubs } from '@elements/logic/comment';
import type { Events as UpdateEvents, Subs as UpdateSubs } from '@elements/logic/update';
import type {
  Events as TextEditorEvents,
  Subs as TextEditorSubs,
} from '@elements/logic/text-editor';
import type { Subs as UserSubs } from '@elements/logic/user';
import type { Events as VotingEvents, Subs as VotingSubs } from '@elements/logic/voting';
import type {
  Events as AuthenticationEvents,
  Subs as AuthenticationSubs,
} from '@elements/logic/authentication';
import type { Events as ProfileEvents, Subs as ProfileSubs } from '@elements/logic/profile';
import type { Events as RouterEvents, Subs as RouterSubs } from '@elements/logic/router';
import type { Events as ActionEvents, Subs as ActionSubs } from '@elements/logic/action';
import type { Events as AlertEvents, Subs as AlertSubs } from '@elements/logic/alert';
import type { Events as AppEvents, Subs as AppSubs } from '@elements/logic/app';
import type { Events as LocaleEvents, Subs as LocaleSubs } from '@elements/logic/locale';
import type {
  Events as MainSearchEvents,
  Subs as MainSearchSubs,
} from '@elements/logic/main-search';

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
