import { localeSlice } from '@elements/logic/locale';
import { appSlice } from '@elements/logic/app';
import { routerSlice } from '@elements/logic/router';
import { authenticationSlice } from '@elements/logic/authentication';
import { commentSlice } from '@elements/logic/comment';
import { mainSearchSlice } from '@elements/logic/main-search';
import { relationshipSlice } from '@elements/logic/relationship';
import { textEditorSlice } from '@elements/logic/text-editor';
import { updateSlice } from '@elements/logic/update';
import { votingSlice } from '@elements/logic/voting';
import { alertSlice } from '@elements/logic/alert';
import { actionSlice } from '@elements/logic/action';
import { profileSlice } from '@elements/logic/profile';
import { userSlice } from '@elements/logic/user';
import { issueSlice } from '@elements/logic/issue';
import { localitySlice } from '@elements/logic/locality';
import { locationSlice } from '@elements/logic/location';

export const slices = [
  localeSlice,
  appSlice,
  routerSlice,
  authenticationSlice,
  commentSlice,
  mainSearchSlice,
  relationshipSlice,
  textEditorSlice,
  updateSlice,
  votingSlice,
  alertSlice,
  actionSlice,
  profileSlice,
  userSlice,
  issueSlice,
  localitySlice,
  locationSlice,
];
