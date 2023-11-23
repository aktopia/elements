import { MediaGallery } from '@elements/components/media-gallery';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useValue } from '@elements/store';
import { useCallback } from 'react';

export const Media = suspensify(({ issueId }: { issueId: string }) => {
  const images = useValue('issue/images', { 'issue/id': issueId });
  const uploadImage = useDispatch('issue.image/add');
  const deleteImage = useDispatch('issue.image/delete');

  const onUpload = useCallback(
    async ({ file, caption }: { file: File; caption: string }) => {
      await uploadImage({ file, caption, 'issue/id': issueId });
    },
    [uploadImage, issueId]
  );

  const onDelete = useCallback(
    async ({ imageId }: { imageId: string }) => {
      await deleteImage({ 'image/id': imageId, 'issue/id': issueId });
    },
    [deleteImage, issueId]
  );

  return <MediaGallery images={images} onDelete={onDelete} onUpload={onUpload} />;
});
