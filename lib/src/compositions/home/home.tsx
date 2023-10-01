import { wrapPage } from '@elements/compositions/wrap-page';
import { useValue } from '@elements/store';
import { EntityType } from '@elements/types';
import { ActionCard } from '@elements/compositions/home/action-card';
import { IssueCard } from '@elements/compositions/home/issue-card';

export const Home = wrapPage(() => {
  const userLocation = useValue('user.locality/location');
  const list = useValue('home-feed/list', { 'user.locality/location': userLocation });

  return (
    <div className={'flex flex-col gap-9'}>
      {list.map((e) => {
        let Component;
        switch (e['entity/type']) {
          case EntityType.Action:
            Component = ActionCard;
            break;
          case EntityType.Issue:
            Component = IssueCard;
            break;
          default:
            Component = () => null;
        }

        return <Component key={e['entity/id']} id={e['entity/id']} />;
      })}
    </div>
  );
});

/*
TODO
 - Make infinite scroll

 */
