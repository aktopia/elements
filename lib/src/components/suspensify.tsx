import { Skeleton } from '@elements/components/skeleton';
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { memo, Suspense } from 'react';

export interface SuspensifyProps {
  suspenseLines?: number;
  suspenseColor?: 'grey' | 'primary';
  suspenseLineHeight?: string;
  suspenseFallback?: ReactNode;
  suspenseCircle?: boolean;
}

export const suspensify = <P extends object>(Component: ComponentType<P>) =>
  memo(
    ({
      suspenseLines,
      suspenseLineHeight,
      suspenseColor,
      suspenseFallback,
      suspenseCircle,
      ...props
    }: ComponentProps<ComponentType<P>> & SuspensifyProps) => {
      let fallback;

      if (suspenseFallback) {
        fallback = suspenseFallback;
      } else {
        fallback = (
          <Skeleton
            circle={suspenseCircle}
            count={suspenseLines}
            height={suspenseLineHeight}
            kind={suspenseColor}
          />
        );
      }
      return (
        <Suspense fallback={fallback}>
          <Component {...(props as ComponentProps<ComponentType<P>>)} />
        </Suspense>
      );
    }
  );
