import { Skeleton } from '@elements/components/skeleton';
import { ComponentProps, ComponentType, memo, Suspense } from 'react';

export interface SuspensifyProps {
  suspenseLines?: number;
  suspenseColor?: 'grey' | 'primary';
  suspenseLineHeight?: string;
}

export const suspensify = <P extends object>(Component: ComponentType<P>) =>
  memo(
    ({
      suspenseLines,
      suspenseLineHeight,
      suspenseColor,
      ...props
    }: ComponentProps<ComponentType<P>> & SuspensifyProps) => {
      return (
        <Suspense
          fallback={
            <Skeleton count={suspenseLines} height={suspenseLineHeight} kind={suspenseColor} />
          }>
          <Component {...(props as ComponentProps<ComponentType<P>>)} />
        </Suspense>
      );
    }
  );
