import { MagnifyingGlassSolid } from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { useDispatch, useStateLike, useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import React, { Fragment, useCallback } from 'react';
import type { EntityType } from '@elements/types';
import { EntityTypeBadge as ResultType } from '@elements/compositions/entity-type-badge';
import { Modal, ModalPanel } from '@elements/components/modal';
import { Combobox } from '@headlessui/react';
import { Link } from '@elements/components/link';

function makeLink(type: EntityType, entityId: string) {
  switch (type) {
    case 'entity.type/action':
      return `/action/${entityId}`;
    case 'entity.type/issue':
      return `/issue/${entityId}`;
    case 'entity.type/user':
      return `/profile/${entityId}#tab=actions`;
  }
}

interface ResultProps {
  type: EntityType;
  id: string;
  entityId: string;
  snippet: string;
}

const Result = ({ type, entityId, snippet }: ResultProps) => {
  return (
    <Combobox.Option as={Fragment} value={makeLink(type, entityId)}>
      <div className={'ui-active:bg-gray-100 cursor-default select-none px-4 py-2'}>
        <Link className={'flex items-center justify-between'} href={makeLink(type, entityId)}>
          <div
            dangerouslySetInnerHTML={{ __html: snippet }}
            className={'text-base text-gray-800 [&_mark]:rounded [&_mark]:bg-blue-100 [&_mark]:p-1'}
          />
          <ResultType size={'sm'} type={type} />
        </Link>
      </div>
    </Combobox.Option>
  );
};

const Results = suspensify(({ query }: { query: string }) => {
  const t = useTranslation();

  const results = useValue('main-search/results', { query });
  const noResults = query && query.trim() !== '' && results?.length === 0;

  return (
    <>
      {results?.length > 0 && (
        <Combobox.Options
          className={'max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800'}>
          {results.map((result) => (
            <Result
              key={result['match/id']}
              entityId={result['entity/id']}
              id={result['match/id']}
              snippet={result['match/snippet']}
              type={result['entity/type']}
            />
          ))}
        </Combobox.Options>
      )}

      {noResults && (
        <p className={'p-4 text-sm text-gray-500'}>{t('common.phrase/empty-results')}</p>
      )}
    </>
  );
});

export const MainSearch = suspensify(() => {
  const t = useTranslation();

  const visible = useValue('main-search/visible');

  const [query, setQuery] = useStateLike('main-search/query', 'main-search.query/set');

  const close = useDispatch('main-search/close');
  const navigateToPath = useDispatch('navigate/path');

  const onClose = useCallback(() => close({}), [close]);

  const onQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const onSelect = useCallback(
    (result: string) => {
      navigateToPath({ path: result, replace: true });
      onClose();
    },
    [navigateToPath, onClose]
  );

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <Combobox onChange={onSelect}>
          <div className={'relative md:w-[500px] w-screen'}>
            <MagnifyingGlassSolid
              aria-hidden={'true'}
              className={'pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400'}
            />
            <Combobox.Input
              autoComplete={'off'}
              className={
                'h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0'
              }
              placeholder={t('main-search/placeholder')}
              value={query}
              onChange={onQueryChange}
            />
          </div>
          <Results query={query} suspenseLines={6} />
        </Combobox>
      </ModalPanel>
    </Modal>
  );
});
