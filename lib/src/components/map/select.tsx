import { Fragment, useCallback, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassSolid, XMarkSolid } from '@elements/icons';
import { isEmpty } from 'lodash';

function formatOptionText(option: any) {
  const { description, matched_substrings } = option;
  // TODO handle multiple matched_substrings, truncate on the correct span
  const { offset, length } = matched_substrings[0];

  return (
    <span className={'truncate'}>
      <span className={'whitespace-pre text-sm font-normal text-stone-600'}>
        {description.slice(0, offset)}
      </span>
      <span className={'whitespace-pre text-sm font-semibold text-stone-800'}>
        {description.slice(offset, offset + length)}
      </span>
      <span className={'whitespace-pre text-sm font-normal text-stone-600'}>
        {description.slice(length + offset)}
      </span>
    </span>
  );
}

export const Select = ({ onChange, options, onChoose }: any) => {
  const [inputText, setInputText] = useState('');
  const [isInputFocussed, setIsInputFocussed] = useState(false);
  const showOptionsDropdown = !isEmpty(options) && isInputFocussed;
  const isInputTextEmpty = isEmpty(inputText);

  const onBlur = useCallback(() => {
    setIsInputFocussed(false);
  }, []);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onChange(value);
      setInputText(value);
    },
    [onChange]
  );

  const onFocus = useCallback(() => {
    setIsInputFocussed(true);
  }, []);

  const onClearInput = useCallback(() => {
    onChange('');
    setInputText('');
  }, [onChange]);

  const onChooseOption = useCallback(
    (option: any) => {
      onChoose(option);
      setInputText(option.description);
    },
    [onChoose]
  );

  return (
    <Combobox onChange={onChooseOption}>
      <div className={'relative z-0'}>
        <div className={'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'}>
          <MagnifyingGlassSolid className={'h-5 w-5 text-gray-400'} />
        </div>
        <Combobox.Input
          className={
            'block h-10 w-full overflow-hidden rounded-lg border border-stone-50 bg-white py-4 pl-10 pr-10 text-stone-600 shadow-lg ring-0 placeholder:text-stone-400 focus:border-stone-50 focus:outline-none focus:ring-0'
          }
          placeholder={'Search'}
          type={'text'}
          value={inputText}
          onBlur={onBlur}
          onChange={onInputChange}
          onFocus={onFocus}
        />
        {!isInputTextEmpty && (
          <button
            className={'absolute inset-y-0 right-0 flex items-center pr-3'}
            type={'button'}
            onClick={onClearInput}>
            <XMarkSolid className={'h-5 w-5 text-gray-400 hover:text-gray-600'} />
          </button>
        )}
      </div>
      <Transition
        as={Fragment}
        enter={'transform transition ease-in-out duration-250'}
        enterFrom={'opacity-0 -translate-y-10'}
        enterTo={'opacity-100 translate-y-0'}
        show={showOptionsDropdown}>
        <Combobox.Options
          className={
            'z-1 relative mt-1 w-full rounded-lg border border-stone-50 bg-white py-1 shadow-lg empty:hidden focus:outline-none sm:text-sm'
          }>
          {options.map((option: any) => (
            <Combobox.Option
              key={option.place_id}
              className={
                'relative inline-flex w-full cursor-pointer py-2 pl-3 pr-4 hover:bg-stone-100'
              }
              value={option}>
              {formatOptionText(option)}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};
