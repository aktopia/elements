import { type Image, MediaGallery } from '@elements/components/media-gallery';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch } from '@elements/store';
import { useCallback } from 'react';

const images: Image[] = [];

export const Media = suspensify(({ issueId }: { issueId: string }) => {
  const upload = useDispatch('issue.image/add');

  const onUpload = useCallback(
    ({ file, caption }: { file: File; caption: string }) => {
      upload({ file, caption, 'issue/id': issueId });
    },
    [upload, issueId]
  );

  return <MediaGallery images={images} onUpload={onUpload} />;
});
