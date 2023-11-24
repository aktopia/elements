import {
  ArrowsRightLeftOutline,
  ChevronDownMiniSolid,
  PlusOutline,
  TrashOutline,
  WrenchOutline,
} from '@elements/icons';
import { suspensify } from '@elements/components/suspensify';
import { EntityTypeBadge } from '@elements/compositions/entity-type-badge';
import { EntityType as ResultType, type LookupRef } from '@elements/types';
import { useDispatch, useValue } from '@elements/store';
import {
  type ChangeEvent,
  type ComponentType,
  Fragment,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from '@elements/translation';
import { Combobox, Listbox } from '@headlessui/react';
import { Button } from '@elements/components/button';
import { RelationType } from '@elements/logic/relationship';
import { ContextMenu as RawContextMenu } from '@elements/components/context-menu';
import { useWrapWaiting } from '@elements/store/hooks';

// TODO Translation for labels
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
  lookupRef: LookupRef;
}

interface Result {
  type: ResultType;
  id: string;
  entityId: string;
  snippet: string;
  text: string;
}

const relationTKey = {
  [RelationType.Resolves]: 'relation/resolves',
  [RelationType.PartiallyResolves]: 'relation/partially-resolves',
  [RelationType.Relates]: 'relation/relates',
};

const icon: Record<RelationType, ComponentType<any>> = {
  [RelationType.Resolves]: WrenchOutline,
  [RelationType.PartiallyResolves]: WrenchOutline,
  [RelationType.Relates]: ArrowsRightLeftOutline,
};

const ContextMenu = suspensify(
  ({ fromLookupRef, id }: { fromLookupRef: LookupRef; id: string }) => {
    const t = useTranslation();
    const canDelete = useValue('relationship/can-delete', {
      'relationship.from/ref': fromLookupRef,
    });
    const deleteRelationship = useDispatch('relationship/delete');
    const openModal = useDispatch('confirmation-modal/open');

    const onDeleteClick = useCallback(() => {
      openModal({
        kind: 'danger',
        confirmText: t('common/delete'),
        titleText: t('relationship.delete.modal/title'),
        bodyText: t('relationship.delete.modal/body'),
        cancelText: t('common/cancel'),
        onConfirm: () =>
          deleteRelationship({ 'relationship/id': id, 'relationship.from/ref': fromLookupRef }),
      });
    }, [openModal, t, deleteRelationship, id, fromLookupRef]);

    const items = useMemo(() => {
      if (!canDelete) {
        return [];
      }

      return [
        {
          text: t('common/remove'),
          onClick: onDeleteClick,
          Icon: TrashOutline,
          kind: 'danger',
          key: 'delete',
        },
      ];
    }, [t, onDeleteClick, canDelete]);

    // @ts-ignore
    return items.length === 0 ? null : <RawContextMenu items={items} orientation={'vertical'} />;
  }
);

const Relationship = suspensify(
  ({ id, fromLookupRef }: { id: string; fromLookupRef: LookupRef }) => {
    const t = useTranslation();

    const type = useValue('relationship.to.entity/type', {
      'relationship/id': id,
    });

    const title = useValue('relationship.to/title', {
      'relationship/id': id,
    });

    const relation = useValue('relationship/relation', {
      'relationship/id': id,
    });

    const Icon = icon[relation];

    return (
      <div
        className={
          'flex flex-col gap-2 rounded-lg border border-gray-300 pl-4 pr-2 py-4 shadow-sm'
        }>
        <div className={'flex items-center justify-between'}>
          <div className={'flex items-center gap-4'}>
            <Icon className={'h-5 w-5 text-gray-500'} />
            <div className={'text-sm text-gray-500'}>{t(relationTKey[relation])}</div>
          </div>
          <div className={'flex items-center justify-center gap-1.5'}>
            <EntityTypeBadge size={'sm'} type={type} />
            <ContextMenu fromLookupRef={fromLookupRef} id={id} />
          </div>
        </div>
        <div className={'text-gray-700'}>{title}</div>
      </div>
    );
  }
);

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
          <EntityTypeBadge size={'xs'} type={type} />
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

const entityTypeToIdAttr = {
  // TODO This should not be done in the front end, send backend result with ref
  [ResultType.Action]: 'action/id',
  [ResultType.Issue]: 'issue/id',
  [ResultType.User]: 'user/id',
};

const NewRelationship = suspensify(({ onAddToggle, fromLookupRef }: any) => {
  const t = useTranslation();
  const query = useValue('main-search/query');
  const setQuery = useDispatch('main-search.query/set');

  const addRelation = useDispatch('relationship/add');

  const [selectedRelation, onSelectChange] = useState(relations[0]);
  const [selectedResult, onSelectResult] = useState<Result | null>(null);

  const onQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery({ value: e.target.value });
    },
    [setQuery]
  );

  const Icon = icon[selectedRelation.id];

  const displayValue = useCallback((result: Result) => {
    return result ? result.text : '';
  }, []);

  const [onAdd, waiting] = useWrapWaiting(
    async () => {
      if (selectedResult) {
        await addRelation({
          'relationship.from/ref': fromLookupRef,
          'relationship.to/ref': [
            // @ts-ignore
            entityTypeToIdAttr[selectedResult.type],
            selectedResult.entityId,
          ],
          'relationship/relation': selectedRelation.id,
        });
      }
    },
    false,
    [addRelation, selectedRelation, selectedResult, fromLookupRef]
  );

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
        <Combobox disabled={waiting} value={selectedResult} onChange={onSelectResult}>
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
        <Button
          disabled={waiting}
          kind={'tertiary'}
          size={'xs'}
          value={t('common/cancel')}
          onClick={onAddToggle}
        />
        <Button
          kind={'success'}
          size={'xs'}
          value={t('common/add')}
          waiting={waiting}
          onClick={onAdd}
        />
      </div>
    </div>
  );
});

export const Relationships = suspensify(({ lookupRef }: RelationsProps) => {
  const t = useTranslation();
  const addingNewRelation = useValue('relationship/adding');
  const relationIds = useValue('relationship/ids', {
    'relationship.from/ref': lookupRef,
  });
  const canCreate = useValue('relationship/can-create', {
    'relationship.from/ref': lookupRef,
  });

  const setAddingNewRelation = useDispatch('relationship.adding/set');

  const onAddToggle = useCallback(() => {
    setAddingNewRelation({
      value: !addingNewRelation,
    });
  }, [addingNewRelation, setAddingNewRelation]);

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex items-center justify-between'}>
        <div className={'text-sm font-medium text-gray-500'}>{t('common/relationships')}</div>
        {canCreate ? (
          <button type={'button'} onClick={onAddToggle}>
            <PlusOutline className={'h-5 w-5 text-gray-500'} />
          </button>
        ) : null}
      </div>
      <div className={'flex flex-col gap-5'}>
        {addingNewRelation ? (
          <NewRelationship fromLookupRef={lookupRef} suspenseLines={3} onAddToggle={onAddToggle} />
        ) : null}
        {relationIds.length > 0 ? (
          relationIds.map((relationId) => (
            <Relationship
              key={relationId}
              fromLookupRef={lookupRef}
              id={relationId}
              suspenseLines={3}
            />
          ))
        ) : (
          <div className={'text-sm text-gray-500'}>{t('relationships/empty')}</div>
        )}
      </div>
    </div>
  );
});

/*
TODO Abstract search functionality
 */
