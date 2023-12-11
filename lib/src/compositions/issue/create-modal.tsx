import { suspensify } from '@elements/components/suspensify';
import { Modal, ModalPanel } from '@elements/components/modal';
import { useDispatch, useValue } from '@elements/store/interface';
import { Button } from '@elements/components/button';
import { type FormEventHandler, type ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from '@elements/translation';
import { ArrowTopRightOnSquareMiniSolid } from '@elements/icons';
import { TextInput } from '@elements/components/text-input';

export const CreateModal = suspensify(({}) => {
  const t = useTranslation();

  const [error, setError] = useState<string | null>(null);
  const visible = useValue('issue.create.modal/visible');
  const title = useValue('issue.create.modal/title');

  const onClose = useDispatch('issue.create.modal/close');
  const updateTitle = useDispatch('issue.create.modal.title/update');

  const onTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (error) {
        setError(null);
      }
      updateTitle({ value: e.target.value });
    },
    [updateTitle, error]
  );

  const onSubmit: FormEventHandler = useCallback(
    (e) => {
      if (title?.trim() === '') {
        setError('Title cannot be empty.');
        e.preventDefault();
        return;
      }
      window.open(`/issue/new?title=${title}`, '_blank');
      onClose({});
    },
    [onClose, title]
  );

  return (
    <Modal visible={visible} onClose={onClose}>
      <ModalPanel>
        <div className={'flex md:w-full w-screen flex-col gap-7 py-7 px-6'}>
          <form className={'flex flex-col gap-8 w-full md:w-[500px]'} onSubmit={onSubmit}>
            <input name={'title'} type={'hidden'} value={title} />
            <TextInput
              error={error}
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
