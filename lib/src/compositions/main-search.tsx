import { MagnifyingGlassSolid } from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useState, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useCallback } from 'react';

type EntityType = 'entity.type/action' | 'entity.type/issue';

interface SearchResult {
  'entity/type': EntityType;
  'match/snippet': string;
  'match/id': string;
  'match/score': string;
  'entity/id': string;
}

const ResultType = ({ type }: { type: string }) => {
  return (
    <div className={'w-min rounded-xl border border-gray-200 bg-gray-50 px-2 py-1'}>
      <p className={'text-xs text-gray-600'}>{type}</p>
    </div>
  );
};

const typeTKey = {
  'entity.type/action': 'common/action',
  'entity.type/issue': 'common/issue',
};

const nameMap = {
  'entity.type/action': 'action',
  'entity.type/issue': 'issue',
};

function makeLink(type: EntityType, entityId: string) {
  return `/${nameMap[type]}/${entityId}`;
}

const Result = ({
  'entity/type': type,
  'match/id': id,
  'entity/id': entityId,
  'match/snippet': snippet,
}: SearchResult) => {
  const t = useTranslation();
  return (
    <Combobox.Option
      className={'ui-active:bg-gray-100 cursor-default select-none px-4 py-2'}
      value={id}>
      <a className={'flex items-center justify-between'} href={makeLink(type, entityId)}>
        <div
          dangerouslySetInnerHTML={{ __html: snippet }}
          className={'text-sm text-gray-700 [&_mark]:rounded [&_mark]:bg-blue-100 [&_mark]:p-1'}
        />
        <ResultType type={t(typeTKey[type])} />
      </a>
    </Combobox.Option>
  );
};

export const MainSearch = suspensify(() => {
  const t = useTranslation();

  const visible = useValue('main-search/visible');

  const results = useValue('main-search/results');

  const close = useDispatch('main-search/close', { emptyParams: true });
  const onClose = useCallback(() => close(), [close]);

  const [query, setQuery] = useState('main-search/query', 'main-search.query/set');

  const onQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const onAfterLeave = useCallback(() => {
    setQuery('');
  }, []);

  const noResults = query && query.trim() !== '' && results?.length === 0;

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Transition.Root appear afterLeave={onAfterLeave} as={Fragment} show={visible}>
      <Dialog as={'div'} className={'relative z-10'} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter={'ease-out duration-300'}
          enterFrom={'opacity-0'}
          enterTo={'opacity-100'}
          leave={'ease-in duration-200'}
          leaveFrom={'opacity-100'}
          leaveTo={'opacity-0'}>
          <div className={'fixed inset-0 bg-opacity-25 transition-opacity'} />
        </Transition.Child>

        <div className={'fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20'}>
          <Transition.Child
            as={Fragment}
            enter={'ease-out duration-300'}
            enterFrom={'opacity-0 scale-95'}
            enterTo={'opacity-100 scale-100'}
            leave={'ease-in duration-200'}
            leaveFrom={'opacity-100 scale-100'}
            leaveTo={'opacity-0 scale-95'}>
            <Dialog.Panel
              className={
                'mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl transition-all'
              }>
              <Combobox>
                <div className={'relative'}>
                  <MagnifyingGlassSolid
                    aria-hidden={'true'}
                    className={'pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400'}
                  />
                  <Combobox.Input
                    autoComplete={'off'}
                    className={
                      'h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
                    }
                    placeholder={t('main-search/placeholder')}
                    value={query}
                    onChange={onQueryChange}
                  />
                </div>

                {results?.length > 0 && (
                  <Combobox.Options
                    className={'max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800'}>
                    {results.map((result) => (
                      <Result key={result.id} {...result} />
                    ))}
                  </Combobox.Options>
                )}

                {noResults && (
                  <p className={'p-4 text-sm text-gray-500'}>{t('common.phrase/empty-results')}</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
});

/*
TODO Unify with modal
 */
