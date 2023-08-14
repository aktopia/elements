import { evt, sub } from '@elements/store/register';

export const textEditorSlice = () => ({
  'text-editor/state': {},
});

sub('text-editor/can-edit', (_state) => true);
sub('text-editor/editing', (_state) => false);
evt('text-editor/edit', (_setState, _params) => null);
evt('text-editor.edit/done', (_setState, _params) => null);
evt('text-editor.edit/cancel', (_setState, _params) => null);
evt('text-editor.text/update', (_setState, _params) => null);
