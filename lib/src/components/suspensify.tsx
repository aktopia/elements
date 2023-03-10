import { Skeleton } from '@elements/components/skeleton';
import { ComponentType, memo, Suspense } from 'react';

export const suspensify = (Component: ComponentType) =>
  memo(({ suspenseLines, suspenseColor = 'grey', ...props }: any) => {
    return (
      <Suspense fallback={<Skeleton count={suspenseLines} kind={suspenseColor} />}>
        <Component {...props} />
      </Suspense>
    );
  });
