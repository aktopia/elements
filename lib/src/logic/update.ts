import { evt, sub } from '@elements/store/register';

export const updateSlice = () => ({
  'update/state': {},
});

sub('update.deletion/in-progress', ({ state }) => ({ 'in-progress': false, id: null }));

sub('update/created-at', ({ state }) => '1321999371968');
sub('update/creator-name', ({ state }) => 'Sunil KS');
sub('update/ids-by-reference', ({ state }) => ['1', '2', '3']);

sub(
  'update/text',
  (_state) =>
    'Amet commodo voluptate est et consequat commodo occaecat ex id sit proident nostrud in. Veniam aliquip veniam sint ad. Ut Lorem duis elit. In laborum sunt elit mollit. Sunt dolor sunt et excepteur laborum aute ea nulla. Ut nisi eiusmod do dolore in consequat ipsum. Et velit cupidatat laborum pariatur. Ipsum veniam fugiat adipisicing deserunt occaecat non id Lorem magna laboris sunt culpa dolor.'
);

evt('new.update/post', ({ setState, params }) => null);
evt('new.update/update', ({ setState, params }) => null);
evt('update.deletion/cancel', ({ setState, params }) => null);
evt('update.deletion/start', ({ setState, params }) => null);
evt('update/delete', ({ setState, params }) => null);
