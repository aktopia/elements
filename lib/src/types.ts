export interface Reference {
  'ref/id': string;
  'ref/attribute': string;
}

export enum EntityType {
  Action = 'entity.type/action',
  Issue = 'entity.type/issue',
  User = 'entity.type/user',
  MetaInitiative = 'entity.type.meta/initiative',
}

export type Ident = [string, string];
