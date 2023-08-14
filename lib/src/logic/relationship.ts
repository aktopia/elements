import { sub } from '@elements/store/register';

export const relationshipSlice = () => ({
  'relationship/state': {},
});

sub('relationship/ids', (_state) => []);
sub('relationship/data', (_state) => {});
