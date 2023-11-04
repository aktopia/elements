import { default as Component } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function kindToColors(kind: string) {
  if (kind === 'primary') {
    return { baseColor: '#dbeafe', highlightColor: '#eff6ff' };
  }

  return { baseColor: '#f3f4f6', highlightColor: '#f8fafc' };
}

export interface SkeletonProps {
  count?: number;
  height?: string;
  kind?: string;
  circle?: boolean;
}

export const Skeleton = ({ count, circle, kind = 'grey', height }: SkeletonProps) => {
  const { baseColor, highlightColor } = kindToColors(kind);

  return (
    <Component
      baseColor={baseColor}
      circle={circle}
      count={count}
      height={height}
      highlightColor={highlightColor}
    />
  );
};
