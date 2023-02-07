import { Skeleton } from '@elements/components/skeleton';
import { ComponentType, memo, Suspense } from 'react';

export const suspensify = (Component: ComponentType) =>
  memo(({ loaderLineCount, loaderKind = 'grey', ...props }: any) => {
    return (
      <Suspense fallback={<Skeleton count={loaderLineCount} kind={loaderKind} />}>
        <Component {...props} />
      </Suspense>
    );
  });
