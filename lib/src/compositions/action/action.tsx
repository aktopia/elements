import { Header } from '@elements/compositions/action/header';
import { HomeSection } from '@elements/compositions/action/home-section';
import { wrapPage } from '@elements/compositions/wrap-page';

export const Action = wrapPage(() => {
  return (
    <div>
      <Header />
      <HomeSection />
    </div>
  );
});

export const routes = {
  action: <Action />,
};