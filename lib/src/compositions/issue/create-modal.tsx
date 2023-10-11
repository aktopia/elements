import { suspensify } from '@elements/components/suspensify';
import { Modal, ModalPanel } from '@elements/components/modal';
import { useDispatch, useStateLike, useValue } from '@elements/store';
import { Button } from '@elements/components/button';
import React, { useCallback } from 'react';
import { useTranslation } from '@elements/translation';
import { ArrowTopRightOnSquareMiniSolid } from '@elements/icons';

export const CreateModal = suspensify(({}) => {
  const t = useTranslation();

  const visible = useValue('issue.create.modal/visible');

  const onClose = useDispatch('issue.create.modal/close');
  const onSave = useDispatch('issue.create.modal/create');
  const [title, updateTitle] = useStateLike(
    'issue.create.modal/title',
    'issue.create.modal.title/update'
  );

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateTitle(e.target.value);
    },
    [updateTitle]
  );

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex w-full flex-col gap-7 py-7 px-6'}>
          <form className={'flex w-max flex-col gap-8'}>
            <input
              className={
                'w-[500px] rounded-md border-none bg-gray-100 p-3 text-xl text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 focus:outline-none'
              }
              placeholder={t('issue.title/placeholder')}
              type={'text'}
              value={title}
              onChange={onTitleChange}
            />
            <div className={'flex items-center justify-end gap-5'}>
              <Button kind={'tertiary'} size={'sm'} value={'Cancel'} onClick={onClose} />
              <a
                href={`/issue/new?title=${title}`}
                rel={'noreferrer'}
                target={'_blank'}
                onClick={onSave}>
                <Button
                  SecondaryIcon={ArrowTopRightOnSquareMiniSolid}
                  kind={'success'}
                  secondaryIconClassName={'relative bottom-px stroke-2'}
                  size={'sm'}
                  value={t('text.draft/create')}
                />
              </a>
            </div>
          </form>
        </div>
      </ModalPanel>
    </Modal>
  );
});
