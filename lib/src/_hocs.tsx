import { Skeleton } from '@elements/components/Skeleton';
import { ComponentType, memo, Suspense } from 'react';

function kindToColors(kind: string) {
  if (kind === 'primary') {
    return { baseColor: '#dbeafe', highlightColor: '#eff6ff' };
  }

  return { baseColor: '#f3f4f6', highlightColor: '#f8fafc' };
}

interface LoaderProps {
  loaderLineCount: number;
  loaderKind?: string;
}

export const wrapLoader = (Component: ComponentType) =>
  memo(({ loaderLineCount, loaderKind = 'grey', ...props }: LoaderProps) => {
    const { baseColor, highlightColor } = kindToColors(loaderKind);

    return (
      <Suspense
        fallback={
          <Skeleton
            baseColor={baseColor}
            count={loaderLineCount}
            highlightColor={highlightColor}
            inline={true}
          />
        }>
        <Component {...props} />
      </Suspense>
    );
  });
