import { evt, sub } from '@elements/store/register';

export const votingSlice = () => ({
  'vote/state': {},
});

sub('vote/count', ({ state }) => '108');
sub('vote/kind', ({ state }) => 'upvote');
evt('vote/upvote', ({ setState, params }) => null);
evt('vote/downvote', ({ setState, params }) => null);
