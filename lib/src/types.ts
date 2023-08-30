export interface Reference {
  'ref/id': string;
  'ref/attribute': string;
}

export enum EntityType {
  action = 'entity.type/action',
  issue = 'entity.type/issue',
}
