import { evt, sub } from '@elements/store/register';

export const textEditorSlice = () => ({
  'text-editor/state': {},
});

sub('text-editor/can-edit', ({ state }) => true);
sub('text-editor/editing', ({ state }) => false);
evt('text-editor/edit', ({ setState, params }) => null);
evt('text-editor.edit/done', ({ setState, params }) => null);
evt('text-editor.edit/cancel', ({ setState, params }) => null);
evt('text-editor.text/update', ({ setState, params }) => null);
