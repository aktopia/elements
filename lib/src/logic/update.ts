import { evt, sub } from '@elements/store/register';

export const updateSlice = () => ({
  'update/state': {},
});

sub('update.deletion/in-progress', (_state) => ({ 'in-progress': false, id: null }));

sub('update/created-at', (_state) => '1321999371968');
sub('update/creator-name', (_state) => 'Sunil KS');
sub('update/ids-by-reference', (_state) => ['1', '2', '3']);

sub(
  'update/text',
  (_state) =>
    'Amet commodo voluptate est et consequat commodo occaecat ex id sit proident nostrud in. Veniam aliquip veniam sint ad. Ut Lorem duis elit. In laborum sunt elit mollit. Sunt dolor sunt et excepteur laborum aute ea nulla. Ut nisi eiusmod do dolore in consequat ipsum. Et velit cupidatat laborum pariatur. Ipsum veniam fugiat adipisicing deserunt occaecat non id Lorem magna laboris sunt culpa dolor.'
);

evt('new.update/post', (_setState, _params) => null);
evt('new.update/update', (_setState, _params) => null);
evt('update.deletion/cancel', (_setState, _params) => null);
evt('update.deletion/start', (_setState, _params) => null);
evt('update/delete', (_setState, _params) => null);
