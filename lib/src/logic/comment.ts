import { evt, sub } from '@elements/store/register';

export const commentSlice = () => ({
  'comment/state': {
    'comment.deletion/in-progress': { 'in-progress': false, id: null },
  },
});

sub('comment/status', (_state) => null);
sub('comment/created-at', (_state) => '181930401324');
sub(
  'comment/text',
  (_state) =>
    'Nulla eu labore excepteur ad anim incididunt proident occaecat quis et cupidatat et proident culpa. Do occaecat qui ad fugiat do amet laboris velit. Excepteur quis laboris veniam anim laborum. Exercitation in Lorem consectetur sit excepteur tempor consectetur.'
);

evt('new.comment/post', (_setState, _params) => null);
evt('new.comment/update', (_setState, _params) => null);
evt('comment.deletion/cancel', (_setState, _params) => null);
evt('comment.deletion/start', (_setState, _params) => null);
evt('comment/delete', (_setState, _params) => null);
