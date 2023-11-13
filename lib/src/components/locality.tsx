import { MapPinOutline, MapPinSolid } from '@elements/icons';

interface LocalityProps {
  onClick: () => void;
  localityName: string;
  isLocalityChosen: boolean;
  notChosenText: string;
  error?: string;
}

export const Locality = ({
  onClick,
  localityName,
  isLocalityChosen,
  notChosenText,
  error,
}: LocalityProps) => {
  const hasError = !!error;

  return isLocalityChosen ? (
    <button
      className={'group flex max-w-5xl items-center justify-center gap-1.5 overflow-hidden'}
      type={'button'}
      onClick={onClick}>
      <MapPinSolid className={'h-4 w-4 text-red-400 group-hover:text-red-500'} />
      <span
        className={
          'overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500 group-hover:text-gray-600 group-hover:underline'
        }>
        {localityName}
      </span>
    </button>
  ) : (
    <button className={'flex flex-col'} type={'button'} onClick={onClick}>
      <div className={'group flex items-center gap-1.5 py-1.5'}>
        <MapPinOutline className={'h-4 w-4 stroke-2 text-gray-500 group-hover:text-gray-600'} />
        <div className={'text-xs text-gray-500 hover:underline group-hover:text-gray-600'}>
          {notChosenText}
        </div>
      </div>
      {hasError ? (
        <div
          className={
            'flex gap-1.5 h-max w-max bg-red-500 text-white rounded-b-md px-1.5 pt-0.5 pb-1'
          }>
          <p className={'text-xs font-medium'}>{error}</p>
        </div>
      ) : null}
    </button>
  );
};

/*
TODO
- Error should be like a tooltip on the right
 */
