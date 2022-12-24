import { Modal } from '@elements/components/modal';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export const Examples = () => {
  return (
    <div className="flex-column flex gap-10">
      <Modal show={true} title={'Sign in'} content={<div className={'w-56'}>Whatever</div>} />
    </div>
  );
};
