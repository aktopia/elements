// import { MediaGallery } from '@elements/components/media-gallery';
import { suspensify } from '@elements/components/suspensify';
import { ComingSoon } from '@elements/components/coming-soon';

export const Media = suspensify(() => {
  return <ComingSoon id={'issue-media'} status={'planned'} />;
});
