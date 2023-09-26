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
}
