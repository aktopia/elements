import { wrapPage } from '@elements/compositions/wrap-page';
import { lazy, Suspense } from 'react';
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
import { Spinner } from '@elements/components/spinner';
import { cx } from '@elements/utils';
import { FAQ } from '@elements/compositions/home/faq';
import { Feed } from '@elements/compositions/home/feed';

const WaterPollution = lazy(() => import('@elements/assets/water-pollution.svg?react'));
const Volunteering = lazy(() => import('@elements/assets/volunteering.svg?react'));

const ImageFallback = ({ className }: any) => (
  <div className={cx(className, 'flex items-center justify-center')}>
    <Spinner kind={'primary'} size={'sm'} visible={true} />
  </div>
);

const Introduction = () => {
  const text = 'The future of democracy is already here.';
  const subText =
    'Aktopia empowers communities to come together and solve their pressing problems.';
  const whatsHappening = "See what's happening near you";

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
          'shadow-sm w-max flex gap-2 justify-center items-center py-2 px-4 rounded-full border border-gray-200 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200'
        }
        href={'#home-feed'}>
        <p className={'text-gray-700 text-lg font-medium'}>{whatsHappening}</p>
        <ChevronRightSolid className={'h-5 w-5 text-gray-700'} />
      </a>
    </section>
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
      <FAQ />
      <Feed />
    </main>
  );
});

export default Home;

/*
TODO
 - Make feed infinite scroll

 */
