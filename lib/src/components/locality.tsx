import { MapPinOutline, MapPinSolid } from '@elements/icons';

interface LocalityProps {
  onClick: () => void;
  localityName: string;
  isLocalityChosen: boolean;
  notChosenText: string;
}

export const Locality = ({
  onClick,
  localityName,
  isLocalityChosen,
  notChosenText,
}: LocalityProps) => {
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
    <button className={'group flex items-center gap-1.5'} type={'button'} onClick={onClick}>
      <MapPinOutline className={'h-4 w-4 stroke-2 text-gray-500 group-hover:text-gray-600'} />
      <div className={'text-xs text-gray-500 hover:underline group-hover:text-gray-600'}>
        {notChosenText}
      </div>
    </button>
  );
};
