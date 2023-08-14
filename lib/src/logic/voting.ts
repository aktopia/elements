import { evt, sub } from '@elements/store/register';

export const votingSlice = () => ({
  'vote/state': {},
});

sub('vote/count', (_state) => '108');
sub('vote/kind', (_state) => 'upvote');
evt('vote/upvote', (_setState, _params) => null);
evt('vote/downvote', (_setState, _params) => null);
