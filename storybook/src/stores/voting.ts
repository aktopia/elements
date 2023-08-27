import { random } from 'lodash';

export const store = {
  sub: {
    'vote/count': random(0, 1000),
    'vote/kind': random(0, 1000) % 2 === 0 ? 'upvote' : 'downvote',
    'current.user/id': '1',
  },
  evt: ['vote/upvote', 'vote/downvote'],
};
