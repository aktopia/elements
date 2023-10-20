// import { MediaGallery } from '@elements/components/media-gallery';
import { suspensify } from '@elements/components/suspensify';
import { ComingSoon } from '@elements/components/coming-soon';
import { Status } from '@elements/logic/meta/initiative';

export const Media = suspensify(() => {
  return <ComingSoon slug={'issue-images'} status={Status.Planned} />;
});
