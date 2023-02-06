import { wrapPage } from '@elements/compositions/wrap-page';

export const Action = wrapPage(() => {
  return <div>{'Action'}</div>;
});

export const routes = {
  action: <Action />,
};
