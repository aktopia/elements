import { suspensify } from '@elements/components/suspensify';
import { Modal, ModalPanel } from '@elements/components/modal';
import { useDispatch, useValue } from '@elements/store';
import { Button } from '@elements/components/button';
import React, { useCallback } from 'react';
import { useTranslation } from '@elements/translation';
import { ArrowTopRightOnSquareMiniSolid } from '@elements/icons';
import { TextInput } from '@elements/components/text-input';

export const CreateModal = suspensify(({}) => {
  const t = useTranslation();

  const visible = useValue('issue.create.modal/visible');
  const title = useValue('issue.create.modal/title');

  const onClose = useDispatch('issue.create.modal/close');
  const updateTitle = useDispatch('issue.create.modal.title/update');

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateTitle({ value: e.target.value });
    },
    [updateTitle]
  );

  const onSubmit = useCallback(() => {
    window.open(`/issue/new?title=${title}`, '_blank');
    onClose({});
  }, [onClose, title]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex md:w-full w-screen flex-col gap-7 py-7 px-6'}>
          <form className={'flex flex-col gap-8 w-full md:w-[500px]'} onSubmit={onSubmit}>
            <input name={'title'} type={'hidden'} value={title} />
            <TextInput
              placeholder={t('issue.title/placeholder')}
              size={'xl'}
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
