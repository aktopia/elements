import { sub } from '@elements/store/register';

export const relationshipSlice = () => ({
  'relationship/state': {},
});

sub('relationship/ids', ({ state }) => []);
sub('relationship/data', ({ state }) => {});
