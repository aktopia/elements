import { sub } from '@elements/store';

export const appSlice = () => ({ 'app/state': { 'app/loading': false } });

sub('app/loading', ({ state }) => state['app/state']['app/loading']);
