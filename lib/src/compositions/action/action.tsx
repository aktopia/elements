import { Header } from '@elements/compositions/action/header';
import { HomeSection } from '@elements/compositions/action/home-section';
import { wrapPage } from '@elements/compositions/wrap-page';

export const Action = wrapPage(() => {
  return (
    <div className={'flex flex-col gap-6'}>
      <Header />
      <HomeSection />
    </div>
  );
});

export const routes = {
  'action/read': <Action />,
};
