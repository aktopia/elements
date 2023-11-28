import { Spinner } from '@elements/components/spinner';

export const FullPageSpinner = (
  <div className={'fixed flex h-full w-full items-center justify-center'}>
    <Spinner kind={'primary'} size={'sm'} visible={true} />
  </div>
);
