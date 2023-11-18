import { MediaGallery } from '@elements/components/media-gallery';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store';
import { useCallback } from 'react';

export const Media = suspensify(({ issueId }: { issueId: string }) => {
  const images = useValue('issue/images', { 'issue/id': issueId });
  const upload = useDispatch('issue.image/add');

  const onUpload = useCallback(
    ({ file, caption }: { file: File; caption: string }) => {
      upload({ file, caption, 'issue/id': issueId });
    },
    [upload, issueId]
  );

  return <MediaGallery images={images} onUpload={onUpload} />;
});
