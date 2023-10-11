import { suspensify } from '@elements/components/suspensify';
import { Modal, ModalPanel } from '@elements/components/modal';
import { useDispatch, useValue } from '@elements/store';
import { Button } from '@elements/components/button';
import React, { useCallback } from 'react';
import { useTranslation } from '@elements/translation';
import { ArrowTopRightOnSquareMiniSolid } from '@elements/icons';

// TODO Don't render modal if it is not visible

export const CreateModal = suspensify(({}) => {
  const t = useTranslation();

  const visible = useValue('action.create.modal/visible');
  const title = useValue('action.create.modal/title');

  const onClose = useDispatch('action.create.modal/close');
  const updateTitle = useDispatch('action.create.modal.title/update');

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateTitle({ value: e.target.value });
    },
    [updateTitle]
  );

  const onSubmit = useCallback(() => {
    window.open(`/action/new?title=${title}`, '_blank');
    onClose({});
  }, [onClose, title]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex w-full flex-col gap-7 py-7 px-6'}>
          <form className={'flex w-max flex-col gap-8'} onSubmit={onSubmit}>
            <input name={'title'} type={'hidden'} value={title} />
            <input
              className={
                'w-[500px] rounded-md border-none bg-gray-100 p-3 text-xl text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:outline-none'
              }
              placeholder={t('action.title/placeholder')}
              type={'text'}
              value={title}
              onChange={onTitleChange}
            />
            <div className={'flex items-center justify-end gap-5'}>
              <Button kind={'tertiary'} size={'sm'} value={'Cancel'} onClick={onClose} />
              <Button
                SecondaryIcon={ArrowTopRightOnSquareMiniSolid}
                kind={'success'}
                secondaryIconClassName={'relative bottom-px stroke-2'}
                size={'sm'}
                type={'submit'}
                value={t('text.draft/create')}
              />
            </div>
          </form>
        </div>
      </ModalPanel>
    </Modal>
  );
});
