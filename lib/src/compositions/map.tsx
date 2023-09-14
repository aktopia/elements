import { ChangeEvent, Fragment, useCallback, useState } from 'react';
import { isEmpty } from 'lodash';
import { Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassSolid, XMarkSolid } from '@elements/icons';
import type { Prediction } from '@elements/utils/location';
import { fetchPredictions, LocationDetails, resolvePlaceId } from '@elements/utils/location';

function formatPrediction(prediction: Prediction) {
  const { match, matchedSubstrings } = prediction;
  // TODO handle multiple matchedSubstrings, truncate on the correct span
  const { offset, length } = matchedSubstrings[0];

  return (
    <span className={'truncate'}>
      <span className={'whitespace-pre text-sm font-normal text-stone-600'}>
        {match.slice(0, offset)}
      </span>
      <span className={'whitespace-pre text-sm font-semibold text-stone-800'}>
        {match.slice(offset, offset + length)}
      </span>
      <span className={'whitespace-pre text-sm font-normal text-stone-600'}>
        {match.slice(length + offset)}
      </span>
    </span>
  );
}

export type Place = LocationDetails;

interface SearchLocationProps {
  onSelect: (place: Place) => void;
}

export const SearchLocation = ({ onSelect }: SearchLocationProps) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [inputText, setInputText] = useState('');
  const isInputTextEmpty = isEmpty(inputText);

  const getPredictions = useCallback((q: string) => {
    fetchPredictions(q).then(setPredictions);
  }, []);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputText(value);
      getPredictions(value);
    },
    [getPredictions]
  );

  const onClearInput = useCallback(() => {
    getPredictions('');
    setInputText('');
  }, [getPredictions]);

  const onSelectOption = useCallback(
    (prediction: Prediction) => {
      setInputText(prediction.match);
      resolvePlaceId(prediction.placeId).then((place) => {
        onSelect(place);
      });
    },
    [onSelect]
  );

  return (
    <Combobox onChange={onSelectOption}>
      <div className={'relative z-0'}>
        <div className={'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'}>
          <MagnifyingGlassSolid className={'h-5 w-5 text-gray-400'} />
        </div>
        <Combobox.Input
          autoComplete={'off'}
          className={
            'block h-10 w-full overflow-hidden rounded-lg border border-stone-50 bg-white py-4 pl-10 pr-10 text-stone-600 shadow-lg ring-0 placeholder:text-stone-400 focus:border-stone-50 focus:outline-none focus:ring-0'
          }
          placeholder={'Search'}
          type={'text'}
          value={inputText}
          onChange={onInputChange}
        />
        {!isInputTextEmpty && (
          <button
            className={'absolute inset-y-0 right-0 flex items-center pr-3'}
            type={'button'}
            onClick={onClearInput}>
            <XMarkSolid className={'h-5 w-5 text-gray-400 hover:text-gray-600'} />
          </button>
        )}
      </div>
      <Transition
        as={Fragment}
        enter={'transform transition ease-in-out duration-250'}
        enterFrom={'opacity-0 -translate-y-10'}
        enterTo={'opacity-100 translate-y-0'}>
        <Combobox.Options
          className={
            'z-1 relative mt-1 w-full rounded-lg border border-stone-50 bg-white py-1 shadow-lg empty:hidden focus:outline-none sm:text-sm'
          }>
          {predictions.map((prediction: Prediction) => (
            <Combobox.Option
              key={prediction.placeId}
              className={
                'relative inline-flex w-full cursor-pointer py-2 pl-3 pr-4 hover:bg-stone-100'
              }
              value={prediction}>
              {formatPrediction(prediction)}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};
/* TODO

Format fetchPredictions results and not let the component do it
 */
