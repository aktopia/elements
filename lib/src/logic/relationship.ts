import { sub } from '@elements/store';
import { EntityType } from '@elements/types';

export enum Relation {
  Resolves = 'resolves',
  PartiallyResolves = 'partially-resolves',
  Relates = 'relates',
}

export type Subs = {
  'relationship/ids': {
    params: {
      'ref/id': string;
      'ref/attribute': string;
    };
    result: string[];
  };
  'relationship.entity/type': {
    params: { 'relation/id': string };
    result: EntityType;
  };
  'relationship.entity/title': {
    params: { 'relation/id': string };
    result: string;
  };
  'relationship/relation': {
    params: { 'relation/id': string };
    result: Relation;
  };
};

export type Events = {};
export const relationshipSlice = () => ({
  'relationship/state': {},
});

const relations: string[] = ['1'];

sub('relationship/ids', ({}) => relations);

sub('relationship.entity/title', ({}) => 'Some title');
sub('relationship.entity/type', ({}) => EntityType.Action);
sub('relationship/relation', ({}) => Relation.Resolves);
