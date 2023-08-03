import { PhotoOutline, PlusOutline } from '@elements/_icons';

const AddMedia = () => {
  const text = 'Add Media';
  return (
    <div
      className={
        'duration-250 group flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition ease-in-out sm:h-52 sm:hover:border-gray-400'
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

export const MediaGallery = ({ images }: any) => {
  return (
    <div className={'space-y-6'}>
      <div className={'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'}>
        <AddMedia />
        {images.map(({ url }: any) => {
          return (
            <img
              key={url}
              alt={'media'}
              className={
                'h-56 w-full cursor-pointer rounded-lg border-t bg-gray-200 object-cover shadow-lg sm:h-52'
              }
              src={url}
            />
          );
        })}
      </div>
    </div>
  );
};
