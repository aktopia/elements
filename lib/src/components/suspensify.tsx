import { Skeleton } from '@elements/components/skeleton';
import { ComponentProps, ComponentType, memo, Suspense } from 'react';

interface SuspensifyProps {
  suspense: {
    lines?: number;
    color?: 'grey' | 'primary';
    lineHeight?: string;
  };
}

export const suspensify = <P extends object>(Component: ComponentType<P>) =>
  memo(
    ({
      suspense: { lines, lineHeight, color },
      ...props
    }: ComponentProps<ComponentType<P>> & SuspensifyProps) => {
      return (
        <Suspense fallback={<Skeleton count={lines} height={lineHeight} kind={color} />}>
          <Component {...(props as ComponentProps<ComponentType<P>>)} />
        </Suspense>
      );
    }
  );
