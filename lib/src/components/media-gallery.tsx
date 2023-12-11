import { PhotoOutline, PlusOutline, TrashOutline, XMarkSolid } from '@elements/icons';
import { type ChangeEvent, useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  SlideOver,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverFooter,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';
import { cx } from '@elements/utils';
import { Spinner } from '@elements/components/spinner';
import { useDispatch } from '@elements/store/interface';
import { useTranslation } from '@elements/translation';
import { useWrapRequireAuth } from '@elements/store/hooks';

const IMAGE_FORMATS_ACCEPT =
  'image/png,image/jpeg,image/gif,image/webp,image/avif,image/tiff,image/svg+xml,image/bmp,image/heif,image/heic';

export interface Image {
  id: string;
  caption?: string;
}

function genImgUrl(id: string, params?: Record<string, any>) {
  const imageRequest = btoa(
    JSON.stringify({
      key: id,
      edits: { contentModeration: true, ...params },
    })
  );
  // FIXME Once dev images are setup, use relative url
  return `https://aktopia.com/image/${imageRequest}`;
}

const AddMedia = ({ onChoose }: any) => {
  const text = 'Add Media';
  const id = useId();
  return (
    <form className={'h-40'}>
      <label
        className={
          'duration-250 group flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition ease-in-out  sm:hover:border-gray-400'
        }
        htmlFor={id}>
        <div className={'relative inline-block'}>
          <PhotoOutline
            className={
              'duration-250 h-14 w-14 text-gray-400 transition ease-in-out sm:group-hover:text-gray-500'
            }
          />
          <PlusOutline
            className={
              'duration-250 absolute bottom-0 right-2 block h-4 w-4 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-white text-gray-400 ring-2 ring-white transition ease-in-out sm:group-hover:text-gray-500'
            }
          />
        </div>
        <p
          className={
            'duration-250 text-gray-400 transition ease-in-out sm:group-hover:text-gray-500'
          }>
          {text}
        </p>
      </label>
      <input
        accept={IMAGE_FORMATS_ACCEPT}
        className={'hidden'}
        id={id}
        type={'file'}
        onInput={onChoose}
      />
    </form>
  );
};

export const Lightbox = ({ image, onClose, onDelete, canDelete }: any) => {
  const t = useTranslation();
  const imgRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(true);
  const openModal = useDispatch('confirmation-modal/open');

  const onDelete_ = useCallback(() => {
    openModal({
      kind: 'danger',
      confirmText: t('common/delete'),
      titleText: t('issue.image.delete.modal/title'),
      bodyText: t('issue.image.delete.modal/body'),
      cancelText: t('common/cancel'),
      onConfirm: async () => {
        await onDelete({ imageId: image.id });
        onClose();
      },
    });
  }, [openModal, t, image, onDelete, onClose]);

  useEffect(() => {
    if (imgRef?.current?.complete) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [image?.id]);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  if (!image) {
    return null;
  }

  const ImageCaptionUI = (
    <div className={'flex items-center justify-center w-full min-h-20 px-5 py-5'}>
      {image?.caption ? <p className={'text-white text-center'}>{image.caption}</p> : null}
    </div>
  );

  const LoadingSpinnerUI = loading ? (
    <div className={'flex h-full w-full items-center justify-center'}>
      <Spinner kind={'secondary'} size={'sm'} visible={true} />
    </div>
  ) : null;

  return (
    <>
      <div className={'fixed inset-0 z-overlay bg-black opacity-95'} />
      <div className={'fixed inset-0 z-modal flex h-full flex-col items-center justify-between'}>
        <div className={'flex w-full items-center justify-end gap-10 px-5 py-5'}>
          {canDelete ? (
            <button className={'flex h-max focus:outline-none'} type={'button'} onClick={onDelete_}>
              <TrashOutline className={'h-6 w-6 text-white'} />
            </button>
          ) : null}
          <button className={'flex h-max focus:outline-none'} type={'button'} onClick={onClose}>
            <XMarkSolid className={'h-7 w-7 text-white'} />
          </button>
        </div>
        {LoadingSpinnerUI}
        <img
          key={image.id}
          ref={imgRef}
          alt={'media'}
          className={cx('object-fit min-h-0', loading && 'hidden')}
          src={genImgUrl(image.id, {})}
          onLoad={onLoad}
        />
        {ImageCaptionUI}
      </div>
    </>
  );
};

const UploadPreview = ({ image, onClose, onUpload }: any) => {
  const visible = !!image;
  const imgSrc = visible ? URL.createObjectURL(image) : '';
  const description = ''; // TODO i18n

  const [waiting, setWaiting] = useState(false);

  const onUpload_ = useCallback(async () => {
    setWaiting(true);
    await onUpload({ file: image, caption: 'update-me' });
    onClose();
    setWaiting(false);
  }, [image, onUpload, onClose]);

  const title = waiting ? 'Uploading...' : 'Upload Image'; // TODO i18n

  return (
    <SlideOver visible={visible} onClose={onClose}>
      <div className={'relative flex h-full flex-col justify-between'}>
        <div>
          <SlideOverHeader>
            <SlideOverTitle title={title} />
            <SlideOverCloseButton disabled={waiting} onClick={onClose} />
          </SlideOverHeader>
          <SlideOverBody>
            <div className={'flex h-fit md:w-[400px] w-full gap-10 flex-col'}>
              <p className={'text-gray-500 text-base'}>{description}</p>
              <img alt={'upload-preview'} className={cx(waiting && 'animate-pulse')} src={imgSrc} />
            </div>
          </SlideOverBody>
        </div>
        <div className={'sticky bottom-0 w-full'}>
          <SlideOverFooter
            actionText={'Upload'}
            actionWaiting={waiting}
            cancelDisabled={waiting}
            cancelText={'Cancel'}
            onAction={onUpload_}
            onCancel={onClose}
          />
        </div>
      </div>
    </SlideOver>
  );
};

const ImageThumbnail = ({ image, onClick }: any) => {
  const imgSrc = genImgUrl(image.id, { resize: { width: 400 } });

  const [loading, setLoading] = useState(true);

  const onClick_ = useCallback(() => {
    onClick(image);
  }, [image, onClick]);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <img
      alt={'media'}
      className={cx(
        'h-40 w-full cursor-pointer rounded-lg bg-gray-200 object-cover shadow-lg',
        loading && 'animate-pulse'
      )}
      src={imgSrc}
      onClick={onClick_}
      onLoad={onLoad}
    />
  );
};

interface MediaGalleryProps {
  images: Image[];
  onUpload: ({ file, caption }: { file: File; caption: string }) => void;
  onDelete: (args: { imageId: string }) => void;
  canDelete: boolean;
}

export const MediaGallery = ({ images, onUpload, onDelete, canDelete }: MediaGalleryProps) => {
  // const t = useTranslation(); // TODO Maybe a pure component shouldn't use translation?
  const [image, setImage] = useState<Image | null>(null);
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);

  const onLightboxOpen = useCallback((image: any) => {
    setImage(image);
  }, []);

  const onLightboxClose = useCallback(() => {
    setImage(null);
  }, []);

  const onUploadPreviewClose = useCallback(() => {
    setImageToUpload(null);
  }, []);

  const noImages = !!images ? images.length === 0 : true;

  const onChoose = useWrapRequireAuth((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    files && setImageToUpload(files[0]);
  }, []);

  return (
    <>
      <Lightbox canDelete={canDelete} image={image} onClose={onLightboxClose} onDelete={onDelete} />
      <UploadPreview image={imageToUpload} onClose={onUploadPreviewClose} onUpload={onUpload} />
      <div className={'flex flex-col items-center space-y-4'}>
        {/*<p className={'text-xs text-gray-400'}>{t('media-gallery.drag-and-drop/hint')}</p>*/}
        <div className={'grid grid-cols-2 gap-8 lg:grid-cols-4 w-full'}>
          <AddMedia onChoose={onChoose} />
          {noImages
            ? null
            : images.map((image) => (
                <ImageThumbnail key={image.id} image={image} onClick={onLightboxOpen} />
              ))}
        </div>
      </div>
    </>
  );
};

/*
TODO
- Dropzone
- Restrict image size
- Max photos
- Accessibility
- Image upload error
- Image upload success and focus on new image
- Image download caption and extension
 */
