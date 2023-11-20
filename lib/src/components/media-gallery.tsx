import { PhotoOutline, PlusOutline, XMarkSolid } from '@elements/icons';
import { type ChangeEvent, useCallback, useId, useState } from 'react';
import {
  SlideOver,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverFooter,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';

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
  return `/image/${imageRequest}`;
}

const AddMedia = ({ onChoose }: any) => {
  const text = 'Add Media';
  const id = useId();
  return (
    <form>
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
      <input className={'hidden'} id={id} type={'file'} onInput={onChoose} />
    </form>
  );
};

export const Lightbox = ({ image, onClose }: any) => {
  const visible = !!image;

  const ImageCaptionUI = (
    <div className={'flex items-center justify-center w-full min-h-20 px-5 py-5'}>
      {image?.caption ? <p className={'text-white text-center'}>{image.caption}</p> : null}
    </div>
  );

  return visible ? (
    <>
      <div className={'fixed inset-0 z-overlay bg-black opacity-95'} />
      <div className={'fixed inset-0 z-modal flex h-full flex-col items-center justify-between'}>
        <div className={'flex w-full items-center justify-end px-5 py-5'}>
          <button
            className={'flex h-max w-full items-center justify-end text-end focus:outline-none'}
            type={'button'}
            onClick={onClose}>
            <XMarkSolid className={'h-7 w-7 text-white'} />
          </button>
        </div>
        <img
          key={image.id}
          alt={'media'}
          className={'object-fit min-h-0'}
          src={genImgUrl(image.id, {})}
        />
        {ImageCaptionUI}
      </div>
    </>
  ) : null;
};

const UploadPreview = ({ image, onClose, onUpload }: any) => {
  const visible = !!image;
  const imgSrc = visible ? URL.createObjectURL(image) : '';
  const description = '';

  const onUpload_ = useCallback(() => {
    onUpload({ file: image, caption: 'update-me' });
    onClose();
  }, [image, onUpload, onClose]);

  return (
    <SlideOver visible={visible} onClose={onClose}>
      <div className={'relative flex h-full flex-col justify-between'}>
        <div>
          <SlideOverHeader>
            <SlideOverTitle title={'Upload Image'} />
            <SlideOverCloseButton onClick={onClose} />
          </SlideOverHeader>
          <SlideOverBody>
            <div className={'flex h-fit  md:w-[400px] w-full gap-10 flex-col'}>
              <p className={'text-gray-500 text-base'}>{description}</p>
              <img alt={'upload-preview'} src={imgSrc} />
            </div>
          </SlideOverBody>
        </div>
        <div className={'sticky bottom-0 w-full'}>
          <SlideOverFooter
            actionText={'Upload'}
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
  const onClick_ = useCallback(() => {
    onClick(image);
  }, [image, onClick]);

  const { id } = image;

  return (
    <div key={id} className={'flex flex-col gap-3'}>
      <img
        alt={'media'}
        className={'h-40 w-full cursor-pointer rounded-lg bg-black object-cover shadow-lg'}
        src={genImgUrl(id, { resize: { width: 400, height: 400 } })}
        onClick={onClick_}
      />
    </div>
  );
};

interface MediaGalleryProps {
  images: Image[];
  onUpload: ({ file, caption }: { file: File; caption: string }) => void;
}

export const MediaGallery = ({ images, onUpload }: MediaGalleryProps) => {
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

  const onChoose = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    files && setImageToUpload(files[0]);
  }, []);

  return (
    <>
      <Lightbox image={image} onClose={onLightboxClose} />
      <UploadPreview image={imageToUpload} onClose={onUploadPreviewClose} onUpload={onUpload} />
      <div className={'flex flex-col items-center space-y-4'}>
        {/*<p className={'text-xs text-gray-400'}>{t('media-gallery.drag-and-drop/hint')}</p>*/}
        {noImages ? (
          <div className={'flex items-center justify-center'}>
            <AddMedia onChoose={onChoose} />
          </div>
        ) : (
          <div className={'grid grid-cols-2 gap-8 lg:grid-cols-4 w-full'}>
            <AddMedia onChoose={onChoose} />
            {images.map((image) => (
              <ImageThumbnail key={image.id} image={image} onClick={onLightboxOpen} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

/*
TODO
- Dropzone
- Restrict image types and size
- Lightbox image loading
- Thumbnail image loading
- Max photos
- Accessibility
- Image upload loading
- Image upload error
- Image upload success and focus on new image
- Show caption on hover
- Get caption
- Delete image and confirmation

 */
