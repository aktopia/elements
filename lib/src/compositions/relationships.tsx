import {
  ArrowsRightLeftOutline,
  ChevronDownMiniSolid,
  PlusOutline,
  WrenchOutline,
} from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { EntityType } from '@elements/compositions/entity-type';
import { EntityType as ResultType } from '@elements/types';
import { useDispatch, useStateLike, useValue } from '@elements/store';
import { type ChangeEvent, type ComponentType, Fragment, useCallback, useState } from 'react';
import { useTranslation } from '@elements/translation';
import { Combobox, Listbox } from '@headlessui/react';
import { Button } from '@elements/components/button';
import { RelationType } from '@elements/logic/relationship';

const relations: { id: RelationType; label: string }[] = [
  {
    id: RelationType.Resolves,
    label: 'Resolves',
  },
  {
    id: RelationType.PartiallyResolves,
    label: 'Partially Resolves',
  },
  {
    id: RelationType.Relates,
    label: 'Relates',
  },
];

interface RelationsProps {
  refId: string;
  refAttribute: string;
}

const relationTKey = {
  'relation.type/resolves': 'relation/resolves',
  'relation.type/partially-resolves': 'relation/partially-resolves',
  'relation.type/relates': 'relation/relates',
};

const icon: Record<RelationType, ComponentType<any>> = {
  'relation.type/resolves': WrenchOutline,
  'relation.type/partially-resolves': WrenchOutline,
  'relation.type/relates': ArrowsRightLeftOutline,
};

const Relationship = suspensify(({ id }: { id: string }) => {
  const t = useTranslation();

  const type = useValue('relationship.entity/type', {
    'relation/id': id,
  });

  const title = useValue('relationship.entity/title', {
    'relation/id': id,
  });

  const relation = useValue('relationship/relation', {
    'relation/id': id,
  });

  const Icon = icon[relation];

  return (
    <div className={'flex flex-col gap-2 rounded-lg border border-gray-300 p-4 shadow-sm'}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex items-center gap-2'}>
          <Icon className={'h-5 w-5 text-gray-500'} />
          <div className={'text-sm text-gray-500'}>{t(relationTKey[relation])}</div>
        </div>
        <EntityType size={'sm'} type={type} />
      </div>
      <div className={'text-gray-700'}>{title}</div>
    </div>
  );
});

interface Result {
  type: ResultType;
  id: string;
  entityId: string;
  snippet: string;
  text: string;
}

const Result = (result: Result) => {
  const { type, snippet } = result;
  return (
    <Combobox.Option as={Fragment} value={result}>
      <div className={'ui-active:bg-gray-100 select-none rounded-md px-2 py-1'}>
        <div className={'flex items-center justify-between gap-1'}>
          <div
            dangerouslySetInnerHTML={{ __html: snippet }}
            className={'text-sm text-gray-800 [&_mark]:rounded [&_mark]:bg-blue-100 [&_mark]:p-1'}
          />
          <EntityType size={'xs'} type={type} />
        </div>
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
          className={
            'absolute top-10 z-10 flex max-h-72 w-full scroll-py-2 flex-col gap-1 overflow-y-auto rounded-md border border-gray-300 bg-white p-1 text-sm text-gray-800 shadow-md'
          }>
          {results.map((result) => (
            <Result
              key={result['match/id']}
              entityId={result['entity/id']}
              id={result['match/id']}
              snippet={result['match/snippet']}
              text={result['match/text']}
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

const NewRelationship = suspensify(({ onAddToggle, refId }: any) => {
  const t = useTranslation();
  const [query, setQuery] = useStateLike('main-search/query', 'main-search.query/set');

  const addRelation = useDispatch('relationship/add');

  const [selectedRelation, onSelectChange] = useState(relations[0]);
  const [selectedResult, onSelectResult] = useState<Result | null>(null);

  const onQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const Icon = icon[selectedRelation.id];

  const displayValue = useCallback((result: Result) => {
    return result ? result.text : '';
  }, []);

  const onAdd = useCallback(() => {
    if (selectedResult) {
      addRelation({
        'relationship.from.entity/id': refId,
        'relationship.to.entity/id': selectedResult.entityId,
        'relationship/relation': selectedRelation.id,
      });
    }
  }, [addRelation, selectedRelation, selectedResult, refId]);

  return (
    <div className={'flex flex-col gap-4 rounded-lg border border-gray-300 p-4 shadow-sm'}>
      <div className={'relative'}>
        <Listbox value={selectedRelation} onChange={onSelectChange}>
          <Listbox.Button as={Fragment}>
            <Button
              Icon={Icon}
              SecondaryIcon={ChevronDownMiniSolid}
              kind={'tertiary'}
              size={'xs'}
              value={selectedRelation.label}
            />
          </Listbox.Button>
          <Listbox.Options
            className={
              'absolute top-9 z-10 flex flex-col rounded-md border border-gray-300 bg-white py-1 px-1 shadow-md'
            }>
            {relations.map((relation) => {
              const RelationIcon = icon[relation.id];
              return (
                <Listbox.Option key={relation.id} as={Fragment} value={relation}>
                  <div
                    className={
                      'ui-active:bg-gray-100 flex cursor-pointer items-center gap-2 rounded p-2'
                    }>
                    <RelationIcon className={'h-4 w-4 text-gray-500'} />
                    <p className={'text-xs font-medium text-gray-600'}>{relation.label}</p>
                  </div>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Listbox>
      </div>
      <div className={'relative'}>
        <Combobox value={selectedResult} onChange={onSelectResult}>
          <div className={'relative flex w-full items-center'}>
            <Combobox.Input
              autoComplete={'off'}
              className={
                'w-full rounded-md border-0 bg-gray-100 px-4 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-0'
              }
              displayValue={displayValue}
              placeholder={t('main-search/placeholder')}
              onChange={onQueryChange}
            />
          </div>
          <Results query={query} suspenseLines={6} />
        </Combobox>
      </div>
      <div className={'flex justify-end gap-2'}>
        <Button kind={'tertiary'} size={'xs'} value={t('common/cancel')} onClick={onAddToggle} />
        <Button kind={'success'} size={'xs'} value={t('common/add')} onClick={onAdd} />
      </div>
    </div>
  );
});

export const Relationships = suspensify(({ refId, refAttribute }: RelationsProps) => {
  const t = useTranslation();
  const [addingNewRelation, setAddingNewRelation] = useStateLike(
    'relationship/adding',
    'relationship.adding/set'
  );

  const relationIds = useValue('relationship/ids', {
    'ref/id': refId,
  });

  const onAddToggle = useCallback(() => {
    setAddingNewRelation(!addingNewRelation);
  }, [addingNewRelation, setAddingNewRelation]);

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex items-center justify-between'}>
        <div className={'text-sm font-medium text-gray-500'}>{t('common/relationships')}</div>
        <button type={'button'} onClick={onAddToggle}>
          <PlusOutline className={'h-5 w-5 text-gray-500'} />
        </button>
      </div>
      <div className={'flex flex-col gap-5'}>
        {addingNewRelation && (
          <NewRelationship
            refAttribute={refAttribute}
            refId={refId}
            suspenseLines={3}
            onAddToggle={onAddToggle}
          />
        )}
        {relationIds.length > 0 ? (
          relationIds.map((relationId) => (
            <Relationship key={relationId} id={relationId} suspenseLines={3} />
          ))
        ) : (
          <div className={'text-sm text-gray-500'}>{t('relationships/empty')}</div>
        )}
      </div>
    </div>
  );
});
