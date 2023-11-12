import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { EntityType } from '@elements/types';
import { ActionCard } from '@elements/compositions/action/action-card';
import { IssueCard } from '@elements/compositions/issue/issue-card';
import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { suspensify } from '@elements/components/suspensify';
import { useTranslation } from '@elements/translation';
import { ViewLocalitySlideOver as RawViewLocalitySlideOver } from '@elements/components/view-locality-slide-over';
import {
  ChatBubbleLeftEllipsisOutline,
  CheckCircleOutline,
  ChevronRightSolid,
  Crowd,
  DocumentTextOutline,
  ExclamationTriangleOutline,
  ExclamationTriangleSolid,
  Giving,
  HandRaisedOutline,
  MapPinOutline,
  MegaphoneOutline,
  PhotoOutline,
} from '@elements/icons';
import { Modal, ModalPanel } from '@elements/components/modal';
import Markdown from 'react-markdown';
import prototypeWarningMarkdown from '@elements/markdown/prototype-warning.md?raw';
import latestUpdateMarkdown from '@elements/markdown/latest-update.md?raw';
import { Button } from '@elements/components/button';
import { Spinner } from '@elements/components/spinner';
import { cx } from '@elements/utils';

const WaterPollution = lazy(() => import('@elements/assets/water-pollution.svg?react'));
const Volunteering = lazy(() => import('@elements/assets/volunteering.svg?react'));

const ImageFallback = ({ className }: any) => (
  <div className={cx(className, 'flex items-center justify-center')}>
    <Spinner kind={'primary'} size={'sm'} visible={true} />
  </div>
);

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
  const nearYou = "Here is what's happening near you.";
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
      <h2 className={'text-4xl text-gray-600 text-center'}>{nearYou}</h2>
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

const PrototypeWarningModal = ({ visible, onClose }: any) => {
  const title = 'Prototype Warning';
  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'px-8 pt-12 pb-10 flex-col flex gap-8 items-center'}>
          <div className={'flex flex-col gap-2 justify-center items-center'}>
            <ExclamationTriangleSolid className={'h-12 w-12 text-amber-500'} />
            <h2 className={'text-2xl text-gray-600 font-semibold'}>{title}</h2>
          </div>
          <Markdown className={'prose prose-gray prose-h3:text-gray-700 prose-h3:font-medium'}>
            {prototypeWarningMarkdown}
          </Markdown>
          <div>
            <Button kind={'primary'} size={'md'} value={'Okay, I understand.'} onClick={onClose} />
          </div>
        </div>
      </ModalPanel>
    </Modal>
  );
};

const LastUpdatedModal = ({ visible, onClose }: any) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'p-6 flex-col flex gap-8'}>
          <Markdown className={'prose prose-gray prose-h3:text-gray-700 prose-h3:font-medium'}>
            {latestUpdateMarkdown}
          </Markdown>
        </div>
      </ModalPanel>
    </Modal>
  );
};

const Introduction = () => {
  const text = 'The future of democracy is already here.';
  const subText =
    'Aktopia empowers communities to come together and solve their pressing problems.';
  const whatsHappening = "See what's happening near you";
  const prototypeWarning = 'Experimental prototype warning';
  const lastUpdated = 'Last updated on 12th Nov 2023';

  const [isPrototypeWarningModalVisible, setIsPrototypeWarningModalVisible] = useState(true);
  const [isLastUpdatedModalVisible, setIsLastUpdatedModalVisible] = useState(false);

  const onPrototypeWarningModalOpen = useCallback(() => {
    setIsPrototypeWarningModalVisible(true);
  }, []);

  const onLastUpdatedModalOpen = useCallback(() => {
    setIsLastUpdatedModalVisible(true);
  }, []);

  const onPrototypeWarningModalClose = useCallback(() => {
    setIsPrototypeWarningModalVisible(false);
  }, []);

  const onLastUpdatedModalClose = useCallback(() => {
    setIsLastUpdatedModalVisible(false);
  }, []);

  return (
    <>
      <section className={'flex flex-col justify-center items-center gap-6'}>
        <div className={'flex flex-col gap-3 items-center'}>
          <button
            data-event-id={'last-updated-button-click'}
            type={'button'}
            onClick={onLastUpdatedModalOpen}>
            <p className={'text-gray-500 font-medium text-xs underline'}>{lastUpdated}</p>
          </button>
          <button
            className={'w-max flex gap-2.5 items-center'}
            type={'button'}
            onClick={onPrototypeWarningModalOpen}>
            <ExclamationTriangleSolid className={'h-6 w-6 text-amber-500'} />
            <p className={'text-amber-800 text-lg hover:underline'}>{prototypeWarning}</p>
          </button>
        </div>
        <h1
          className={
            'md:text-7xl text-5xl text-center font-semibold bg-gradient-to-br from-blue-600 to-blue-800 text-transparent bg-clip-text p-5'
          }>
          {text}
        </h1>
        <h2 className={'text-xl text-center font-medium text-gray-500'}>{subText}</h2>
        <a
          className={
            'shadow-sm w-max flex gap-2 justify-center items-center py-2 px-4 rounded-full border border-gray-200 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200'
          }
          href={'#home-feed'}>
          <p className={'text-gray-700 text-lg font-medium'}>{whatsHappening}</p>
          <ChevronRightSolid className={'h-5 w-5 text-gray-700'} />
        </a>
      </section>
      <PrototypeWarningModal
        visible={isPrototypeWarningModalVisible}
        onClose={onPrototypeWarningModalClose}
      />
      <LastUpdatedModal visible={isLastUpdatedModalVisible} onClose={onLastUpdatedModalClose} />
    </>
  );
};

const IssueIntroduction = () => {
  const issueTitleItStarts = 'It starts with an';
  const issueTitleIssue = 'issue';
  const issueDescription =
    'You spot a public issue, minor or significant. Begin by reporting it. As others participate, the issue gains public awareness.';

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
          <h3 className={'text-3xl text-gray-600'}>{issueTitleItStarts}</h3>
          <div className={'flex items-center'}>
            <h3 className={'text-3xl text-rose-600 font-bold'}>{issueTitleIssue}</h3>
          </div>
        </div>
        <p className={'text-gray-500 text-xl'}>{issueDescription}</p>
      </div>
      <div
        className={'flex flex-col md:flex-row md:gap-20 gap-12 w-full items-center justify-center'}>
        <Suspense fallback={<ImageFallback className={'h-72 w-72'} />}>
          <WaterPollution className={'h-72 w-72'} />
        </Suspense>
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
  const actionDescription =
    "The community comes together, creates an action. Led by volunteers and backed by sponsors, they drive the action to completion. Let's advance local communities, nations and the world one action at a time.";
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
          {/* eslint-disable-next-line react/jsx-no-literals */}
          <h3 className={'text-3xl text-gray-600'}>{'...and ends with an'}</h3>
          {/* eslint-disable-next-line react/jsx-no-literals */}
          <h3 className={'text-3xl text-blue-600 font-bold'}>{'action'}</h3>
        </div>
        <p className={'text-gray-500 text-xl'}>{actionDescription}</p>
      </div>
      <div
        className={
          'flex md:flex-row-reverse flex-col md:gap-20 gap-12 w-full items-center justify-center'
        }>
        <Suspense fallback={<ImageFallback className={'h-80 w-80'} />}>
          <Volunteering className={'h-80 w-80'} />
        </Suspense>
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
