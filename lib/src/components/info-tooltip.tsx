import {
  Arrow as TooltipArrow,
  Content as TooltipContent,
  Portal as TooltipPortal,
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { QuestionMarkCircleMiniSolid } from '@elements/icons';
import type { ReactNode } from 'react';

export const InfoTooltip = ({ text }: { text: string }) => {
  return (
    <TooltipProvider delayDuration={500}>
      <TooltipRoot>
        <TooltipTrigger>
          <QuestionMarkCircleMiniSolid className={'h-4 w-4 text-gray-500'} />
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className={'rounded-md z-tooltip bg-gray-700 py-2 px-2.5 text-xs text-white shadow-lg'}
            sideOffset={3}>
            <p>{text}</p>
            <TooltipArrow className={'fill-gray-700'} />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export const WithInfoTooltip = ({ text, children }: { text?: string; children: ReactNode }) => {
  return !!text ? (
    <TooltipProvider delayDuration={500}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className={'rounded-md z-tooltip bg-gray-700 py-2 px-2.5 text-xs text-white shadow-lg'}
            sideOffset={3}>
            <p>{text}</p>
            <TooltipArrow className={'fill-gray-700'} />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  ) : (
    children
  );
};
