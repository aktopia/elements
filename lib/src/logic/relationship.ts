import { sub } from '@elements/store';

export const relationshipSlice = () => ({
  'relationship/state': {},
});

const relations = [];
const data = {};

sub('relationship/ids', ({ state }) => relations);
sub('relationship/data', ({ state }) => data);
