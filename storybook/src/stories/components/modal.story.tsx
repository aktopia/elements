import { Modal } from '@elements/components/modal';
import { lorem } from '@story/utils/string';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export const Examples = () => {
  return (
    <div className={'flex-column flex gap-10'}>
      <Modal show={true} title={'Sign in'}>
        <div className={'w-56'}>{lorem.generateWords(2)}</div>
      </Modal>
    </div>
  );
};
