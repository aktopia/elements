import { PhotoOutline, PlusOutline, XMarkSolid } from '@elements/icons';
import { useState } from 'react';

const AddMedia = () => {
  const text = 'Add Media';
  return (
    <div
      className={
        'duration-250 group flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition ease-in-out  sm:hover:border-gray-400'
      }>
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
    </div>
  );
};

export const Lightbox = ({ image, onClose, visible }: any) => {
  return visible ? (
    <>
      <div className={'fixed inset-0 z-40 bg-black opacity-95'} />
      <div className={'fixed inset-0 z-50 flex h-full flex-col items-center justify-between'}>
        <div className={'flex w-full items-center justify-end px-3 py-4'}>
          <button
            className={'flex h-max w-full items-center justify-end text-end focus:outline-none'}
            type={'button'}
            onClick={onClose}>
            <XMarkSolid className={'h-5 w-5 text-white'} />
          </button>
        </div>
        <img key={image.url} alt={'media'} className={'object-fit min-h-0'} src={image.url} />
        <div className={'flex h-max w-full items-center justify-center px-3 py-4'}>
          <p className={'text-white'}>{image.caption || 'whatever'}</p>
        </div>
      </div>
    </>
  ) : null;
};

export const MediaGallery = ({ images }: any) => {
  const [image, setImage] = useState<any>(null);
  return (
    <>
      {image && <Lightbox image={image} visible={!!image} onClose={() => setImage(null)} />}
      <div className={'flex flex-col items-center space-y-4'}>
        <p className={'text-xs text-gray-400'}>{'You can drag and drop your media here to add.'}</p>
        <div className={'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'}>
          <AddMedia />
          {images.map((image: any) => {
            const { id, url } = image;
            return (
              <div key={id} className={'flex flex-col gap-3'}>
                <img
                  key={url}
                  alt={'media'}
                  className={
                    'h-40 w-full cursor-pointer rounded-lg border border-gray-300 bg-black object-cover shadow-lg'
                  }
                  src={url}
                  onClick={() => setImage(image)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
