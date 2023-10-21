import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { EntityType } from '@elements/types';
import { ActionCard } from '@elements/compositions/action/action-card';
import { IssueCard } from '@elements/compositions/issue/issue-card';
import { useCallback, useMemo, useState } from 'react';
import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { ViewLocalitySlideOver as RawViewLocalitySlideOver } from '@elements/components/view-locality-slide-over';
import WaterPollution from '@elements/assets/water-pollution.svg?react';
import Volunteering from '@elements/assets/volunteering.svg?react';
import {
  ChatBubbleLeftEllipsisOutline,
  CheckCircleOutline,
  ChevronRightSolid,
  Crowd,
  DocumentTextOutline,
  ExclamationTriangleOutline,
  Giving,
  HandRaisedOutline,
  MapPinOutline,
  MegaphoneOutline,
  PhotoOutline,
} from '@elements/icons';

const ViewIssueLocalitySlideOver = suspensify(({ entityId, onClose }: any) => {
  const t = useTranslation();
  const initialCenter = useValue('issue.locality/location', { 'issue/id': entityId });
  const initialZoom = useValue('issue.locality/zoom', { 'issue/id': entityId });
  const locations = useMemo(() => [initialCenter], [initialCenter]);

  return (
    <RawViewLocalitySlideOver
      initialCenter={initialCenter}
      initialZoom={initialZoom}
      locations={locations}
      title={t('issue/locality')}
      visible={true}
      onClose={onClose}
    />
  );
});

const ViewActionLocalitySlideOver = suspensify(({ entityId, onClose }: any) => {
  const t = useTranslation();
  const initialCenter = useValue('action.locality/location', { 'action/id': entityId });
  const initialZoom = useValue('action.locality/zoom', { 'action/id': entityId });
  const locations = useMemo(() => [initialCenter], [initialCenter]);

  return (
    <RawViewLocalitySlideOver
      initialCenter={initialCenter}
      initialZoom={initialZoom}
      locations={locations}
      title={t('action/locality')}
      visible={true}
      onClose={onClose}
    />
  );
});

const Card = ({ entityId, entityType, onLocalitySlideOverOpen }: any) => {
  const onLocalitySlideOverOpen_ = useCallback(
    (entityId: string) => {
      onLocalitySlideOverOpen(entityId, entityType);
    },
    [entityType, onLocalitySlideOverOpen]
  );

  let Component;
  switch (entityType) {
    case EntityType.Action:
      Component = ActionCard;
      break;
    case EntityType.Issue:
      Component = IssueCard;
      break;
    default:
      Component = () => null;
  }

  return (
    <Component key={entityId} id={entityId} onLocalitySlideOverOpen={onLocalitySlideOverOpen_} />
  );
};

export const Feed = () => {
  const userLocation = useValue('user.locality/location');
  const list = useValue('home-feed/list', { 'user.locality/location': userLocation });
  const [localitySlideOverArgs, setLocalitySlideOverArgs] = useState<{
    entityId?: string;
    entityType?: EntityType;
    visible: boolean;
  }>({
    visible: false,
  });

  const onLocalitySlideOverOpen = useCallback((entityId: string, entityType: EntityType) => {
    setLocalitySlideOverArgs({ entityId, entityType, visible: true });
  }, []);

  const onLocalitySlideOverClose = useCallback(() => {
    setLocalitySlideOverArgs({ visible: false });
  }, []);

  const viewLocalitySlideOverUI = useMemo(() => {
    if (!localitySlideOverArgs.visible) {
      return null;
    }

    let Component;
    switch (localitySlideOverArgs.entityType) {
      case EntityType.Action:
        Component = ViewActionLocalitySlideOver;
        break;
      case EntityType.Issue:
        Component = ViewIssueLocalitySlideOver;
        break;
      default:
        Component = () => null;
    }

    return (
      <Component entityId={localitySlideOverArgs.entityId} onClose={onLocalitySlideOverClose} />
    );
  }, [
    localitySlideOverArgs.entityId,
    localitySlideOverArgs.entityType,
    onLocalitySlideOverClose,
    localitySlideOverArgs.visible,
  ]);

  return (
    <section className={'flex flex-col gap-20 scroll-mt-20 w-full'} id={'home-feed'}>
      <h2 className={'text-4xl text-gray-600 text-center'}>
        {"Here is what's happening near you."}
      </h2>
      <div className={'flex flex-col gap-9'}>
        {list.map((e) => (
          <Card
            key={e['entity/id']}
            entityId={e['entity/id']}
            entityType={e['entity/type']}
            onLocalitySlideOverOpen={onLocalitySlideOverOpen}
          />
        ))}
      </div>
      {viewLocalitySlideOverUI}
    </section>
  );
};

const Introduction = () => {
  const text = 'The future of community is already here.';
  const subText =
    'Aktopia empowers communities to come together and solve their pressing problems.';
  return (
    <section className={'flex flex-col justify-center items-center gap-6'}>
      <h1
        className={
          'md:text-7xl text-5xl text-center font-semibold bg-gradient-to-br from-blue-600 to-blue-800 text-transparent bg-clip-text p-5'
        }>
        {text}
      </h1>
      <h2 className={'text-xl text-center font-medium text-gray-500'}>{subText}</h2>
      <a
        className={
          'shadow-sm w-max flex gap-2 justify-center items-center py-2 px-4 rounded-full border border-gray-300 bg-gradient-to-br from-blue-50 to-blue-100'
        }
        href={'#home-feed'}>
        <p className={'text-gray-700 text-lg font-medium'}>{"See what's happening near you"}</p>
        <ChevronRightSolid className={'h-5 w-5 text-gray-700'} />
      </a>
    </section>
  );
};

const IssueIntroduction = () => {
  const features = [
    {
      text: 'Describe the issue in detail.',
      Icon: DocumentTextOutline,
    },
    {
      text: 'Add media related to the issue.',
      Icon: PhotoOutline,
    },
    {
      text: 'Add spots in a map to locate the issue.',
      Icon: MapPinOutline,
    },
    {
      text: "Collectively choose the issue's severity.",
      Icon: ExclamationTriangleOutline,
    },
    {
      text: "Tell if you're directly facing the issue.",
      Icon: HandRaisedOutline,
    },
    {
      text: 'Discuss the issue in depth.',
      Icon: ChatBubbleLeftEllipsisOutline,
    },
  ];
  return (
    <section className={'flex flex-col md:gap-16 gap-12 w-full'}>
      <div className={'flex flex-col gap-5'}>
        <div className={'flex gap-2 items-center'}>
          <h3 className={'text-3xl text-gray-600'}>{'It starts with an'}</h3>
          <div className={'flex items-center'}>
            <h3 className={'text-3xl text-rose-600 font-bold'}>{'issue'}</h3>
          </div>
        </div>
        <p className={'text-gray-500 text-xl'}>
          {
            'You spot a public issue, minor or significant. Begin by reporting it. As others participate, the issue gains public awareness.'
          }
        </p>
      </div>
      <div
        className={'flex flex-col md:flex-row md:gap-20 gap-12 w-full items-center justify-center'}>
        <WaterPollution className={'h-72 w-72'} />
        <ul className={'flex flex-col gap-5'}>
          {features.map(({ text, Icon }) => (
            <li key={text} className={'flex gap-5 items-center'}>
              <Icon className={'h-7 w-7 text-gray-600'} />
              <p className={'text-gray-600 text-lg'}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const ActionIntroduction = () => {
  const features = [
    {
      text: 'Volunteer for an action.',
      Icon: Crowd,
    },
    {
      text: 'Fund an action.',
      Icon: Giving,
    },
    {
      text: 'Document the plan of action.',
      Icon: DocumentTextOutline,
    },
    {
      text: 'Stay up to date on the progress.',
      Icon: MegaphoneOutline,
    },
    {
      text: 'Organize the action into smaller tasks.',
      Icon: CheckCircleOutline,
    },
    {
      text: 'Vet the action in depth.',
      Icon: ChatBubbleLeftEllipsisOutline,
    },
  ];
  return (
    <section className={'flex flex-col md:gap-16 gap-12 w-full'}>
      <div className={'flex flex-col items-center gap-9'}>
        <div className={'flex gap-2 items-center flex-wrap'}>
          <h3 className={'text-3xl text-gray-600'}>{'...and ends with an'}</h3>
          <h3 className={'text-3xl text-blue-600 font-bold'}>{'action'}</h3>
        </div>
        <p className={'text-gray-500 text-xl'}>
          {
            "The community comes together, creates an action. Driven by volunteers and backed by sponsors, they bring the action to fruition. Let's advance local communities, nations and the world one action at a time."
          }
        </p>
      </div>
      <div
        className={
          'flex md:flex-row-reverse flex-col md:gap-20 gap-12 w-full items-center justify-center'
        }>
        <Volunteering className={'h-80 w-80'} />
        <ul className={'flex flex-col gap-5'}>
          {features.map(({ text, Icon }) => (
            <li key={text} className={'flex gap-5 items-center'}>
              <Icon className={'h-7 w-7 text-gray-600'} />
              <p className={'text-gray-600 text-lg'}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const Home = wrapPage(() => {
  return (
    <main className={'flex-col flex md:gap-36 gap-20 justify-center items-center'}>
      <Introduction />
      <IssueIntroduction />
      <ActionIntroduction />
      <Feed />
    </main>
  );
});

/*
TODO
 - Make feed infinite scroll

 */
