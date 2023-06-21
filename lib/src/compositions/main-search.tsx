import { MagnifyingGlassSolid } from '@elements/_icons';
import { useValue } from '@elements/store';
import { useTranslation } from '@elements/translation';
import { Combobox, Dialog, Transition } from '@headlessui/react';
/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment } from 'react';

interface ResultProps {
  type: 'entity/action' | 'entity/issue';
  text: string;
  id: string;
}

const ResultType = ({ type }: { type: string }) => {
  return (
    <div className={'w-min rounded-xl border border-gray-200 bg-gray-50 px-2 py-1'}>
      <p className={'text-xs text-gray-600'}>{type}</p>
    </div>
  );
};

const typeTKey = {
  'entity/action': 'common/action',
  'entity/issue': 'common/issue',
};
const Result = ({ type, id, text }: ResultProps) => {
  const t = useTranslation();
  return (
    <Combobox.Option
      className={'ui-active:bg-gray-100 cursor-default select-none px-4 py-2'}
      value={id}>
      <div className={'flex items-center justify-between'}>
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className={'text-sm text-gray-700 [&_mark]:rounded [&_mark]:bg-blue-100 [&_mark]:p-1'}
        />
        <ResultType type={t(typeTKey[type])} />
      </div>
    </Combobox.Option>
  );
};

export const MainSearch = () => {
  const query = useValue<string>('main-search/query');
  const results = useValue<any[]>('main-search/results');

  return (
    <Transition.Root appear afterLeave={console.log} as={Fragment} show={true}>
      <Dialog as={'div'} className={'relative z-10'} onClose={console.log}>
        <Transition.Child
          as={Fragment}
          enter={'ease-out duration-300'}
          enterFrom={'opacity-0'}
          enterTo={'opacity-100'}
          leave={'ease-in duration-200'}
          leaveFrom={'opacity-100'}
          leaveTo={'opacity-0'}>
          <div className={'fixed inset-0 bg-opacity-25 transition-opacity'} />
        </Transition.Child>

        <div className={'fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20'}>
          <Transition.Child
            as={Fragment}
            enter={'ease-out duration-300'}
            enterFrom={'opacity-0 scale-95'}
            enterTo={'opacity-100 scale-100'}
            leave={'ease-in duration-200'}
            leaveFrom={'opacity-100 scale-100'}
            leaveTo={'opacity-0 scale-95'}>
            <Dialog.Panel
              className={
                'mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'
              }>
              <Combobox onChange={console.log}>
                <div className={'relative'}>
                  <MagnifyingGlassSolid
                    aria-hidden={'true'}
                    className={'pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400'}
                  />
                  <Combobox.Input
                    className={
                      'h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
                    }
                    placeholder={'Search...'}
                    onChange={console.log}
                  />
                </div>

                {results.length > 0 && (
                  <Combobox.Options
                    static
                    className={'max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800'}>
                    {results.map((result) => (
                      <Result key={result.id} {...result} />
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' && results.length === 0 && (
                  <p className={'p-4 text-sm text-gray-500'}>{'Nothing found.'}</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
