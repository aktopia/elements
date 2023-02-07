import { wrapPage } from '@elements/compositions/wrap-page';

export const Action = wrapPage(() => {
  return (
    <div>
      {'actions'}
      {/*<Header />*/}
      {/*<HomeSection />*/}
    </div>
  );
});

export const routes = {
  action: <Action />,
};
