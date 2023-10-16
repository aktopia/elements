export interface Reference {
  'ref/id': string;
  'ref/attribute': string;
}

export interface Ref {
  refId: string;
  refAttribute: string;
}

export enum EntityType {
  Action = 'entity.type/action',
  Issue = 'entity.type/issue',
  User = 'entity.type/user',
  MetaInitiative = 'entity.type.meta/initiative',
}

export type EntityId = string;

export type Keyword = string;

export type LookupRef = [Keyword, string | Keyword] | EntityId;
