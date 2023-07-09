import { lorem } from '@story/utils/string';
import { memoize } from 'lodash';

const inProgress = {
  'in-progress': false,
  id: null,
};

const commentsByParentId = memoize(({ 'ref/id': id, 'ref/attribute': identifier }: any) => {
  if (identifier === 'entity.type/action') {
    return ['comment-1', 'comment-5'];
  }
  if (identifier === 'entity.type/comment') {
    switch (id) {
      case 'comment-1':
        return ['comment-2', 'comment-3'];
      case 'comment-2':
        return ['comment-4'];
      default:
        return [];
    }
  }
  return [];
});

export const store = {
  read: {
    'comment.deletion/in-progress': inProgress,
    'comment/creator-name': ({ 'comment/id': id }: { 'comment/id': string }) => {
      switch (id) {
        case 'comment-1':
          return 'Sunil KS';
        case 'comment-2':
          return 'Madhumitha Sriram';
        case 'comment-3':
          return 'Krishna Sunil';
        case 'comment-4':
          return 'Krishna Sunil';
        case 'comment-5':
          return 'Meera Sunil';
        default:
          return 'Madhumitha Sriram';
      }
    },
    'comment/text': lorem.generateSentences(4),
    'comment/status': null, // or 'deleted'
    'comment/ids-by-reference': commentsByParentId,
    'current.user/id': '1',
    'user/name': 'Sunil KS',
  },
  dispatch: [
    'new.comment/post',
    'new.comment/update',
    'comment.deletion/cancel',
    'comment.deletion/start',
    'comment/delete',
  ],
};
