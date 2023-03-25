import { Skeleton } from '@elements/components/skeleton';
import { ComponentType, memo, Suspense } from 'react';

export const suspensify = (Component: ComponentType) =>
  memo(({ suspenseLines, suspenseColor = 'grey', suspenseLineHeight, ...props }: any) => {
    return (
      <Suspense
        fallback={
          <Skeleton count={suspenseLines} height={suspenseLineHeight} kind={suspenseColor} />
        }>
        <Component {...props} />
      </Suspense>
    );
  });
