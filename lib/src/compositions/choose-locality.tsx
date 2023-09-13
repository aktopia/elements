import { suspensify } from '@elements/components/suspensify';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  SlideOver,
  SlideOverBody,
  SlideOverCloseButton,
  SlideOverFooter,
  SlideOverHeader,
  SlideOverTitle,
} from '@elements/components/slide-over';
import { MapPinOutline } from '@elements/icons';
import { Combobox } from '@headlessui/react';
import { useDispatch, useValue } from '@elements/store';

function formatOptionText(option: any) {
  const { description, matched_substrings } = option;
  // TODO handle multiple matched_substrings, truncate on the correct span
  const { offset, length } = matched_substrings[0];

  return (
    <span className={'truncate'}>
      <span className={'whitespace-pre text-sm font-normal text-stone-600'}>
        {description.slice(0, offset)}
      </span>
      <span className={'whitespace-pre text-sm font-semibold text-stone-800'}>
        {description.slice(offset, offset + length)}
      </span>
      <span className={'whitespace-pre text-sm font-normal text-stone-600'}>
        {description.slice(length + offset)}
      </span>
    </span>
  );
}

interface ResultsProps {
  query: string;
}

const Results = suspensify(({ query }: ResultsProps) => {
  const results = useValue('choose-locality.search/results', { query });

  return results?.length > 0 ? (
    <Combobox.Options
      className={
        'absolute top-11 w-full rounded-lg border border-gray-300 bg-white py-1 shadow-lg empty:hidden focus:outline-none sm:text-sm'
      }>
      {results.map((option: any) => (
        <Combobox.Option
          key={option.place_id}
          className={'inline-flex w-full cursor-pointer py-2 pl-3 pr-4 hover:bg-gray-100'}
          value={option}>
          {formatOptionText(option)}
        </Combobox.Option>
      ))}
    </Combobox.Options>
  ) : null;
});

const Search = suspensify(({}) => {
  const [selected, setSelected] = useState<any>(null);
  const query = useValue('choose-locality.search.input/query');
  const updateQuery = useDispatch('choose-locality.search.input.query/update');

  const onChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      updateQuery({ value: e.target.value });
    },
    [updateQuery]
  );

  const onSelect = useCallback(
    (option: any) => {
      setSelected(option);
      updateQuery({ value: option.description });
    },
    [updateQuery]
  );

  return (
    <Combobox value={selected} onChange={onSelect}>
      <div className={'relative flex w-full flex-col gap-2'}>
        <div className={'relative'}>
          <div className={'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2'}>
            <MapPinOutline className={'h-5 w-5 text-gray-400'} />
          </div>
          <Combobox.Input
            autoComplete={'off'}
            className={
              'block h-10 w-full overflow-hidden overflow-ellipsis rounded-lg border border-gray-300 bg-white pl-8 pr-4 text-gray-700 shadow-sm ring-0 placeholder:text-gray-400 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-600 focus:shadow-none focus:outline-none focus:ring-0'
            }
            placeholder={'Search'}
            type={'text'}
            value={query}
            onChange={onChange}
          />
        </div>
        <Results query={query} suspenseLines={0} />
      </div>
    </Combobox>
  );
});

export const ChooseLocalitySlideOver = suspensify(() => {
  const visible = useValue('choose-locality.slide-over/visible');

  const onClose = useDispatch('choose-locality.slide-over/close') as () => void;

  return (
    <SlideOver visible={visible} onClose={onClose}>
      <div className={'flex h-full flex-col justify-between'}>
        <div>
          <SlideOverHeader>
            <SlideOverTitle title={'Choose Locality'} />
            <SlideOverCloseButton onClick={onClose} />
          </SlideOverHeader>
          <SlideOverBody>
            <div className={'flex items-center gap-5'}>
              <Search />
            </div>
          </SlideOverBody>
        </div>
        <SlideOverFooter actionText={'Done'} cancelText={'Cancel'} onCancel={onClose} />
      </div>
    </SlideOver>
  );
});
