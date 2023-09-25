import { lorem } from '@story/utils/string';
import { randomTimestamp } from '@story/utils/time';

export const store = {
  sub: {
    'issue/locations': [
      { id: '1', lng: 78.9629, lat: 20.5937, caption: lorem.generateSentences(1) },
      { id: '2', lng: 80.237617, lat: 13.067439, caption: lorem.generateSentences(1) },
    ],
    'issue.location.default/center': { lng: 78.9629, lat: 20.5937 },
    'issue.location.default/zoom': 4,
    'issue.location.slide-over/visible': true,
    'location.created-by/name': 'Sunil KS',
    'location/created-at': randomTimestamp(),
    'location/address': 'Thiruvanmiyur, Chennai, Tamil Nadu, India',
    'location/caption': 'Large Pothole',
  },
  evt: [
    'issue.location.slide-over/open',
    'issue.location.slide-over/close',
    'issue.location/add',
    'issue.new.location.center/update',
    'issue.new.location.caption/update',
  ],
};
