import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Root as AccordionRoot,
} from '@radix-ui/react-accordion';
import { ChevronDownOutline } from '@elements/icons';

const QnA = [
  {
    id: 'government-role',
    q: "Isn't addressing public issues the government's responsibility?",
    a: "While the government's responsibility is undeniable, our vision is future-oriented. We foresee a society where the government intervenes only in critical situations, like national or home security. Our aim is to encourage communal problem-solving for local issues, in collaboration with government bodies.",
  },
];

export const FAQ = () => {
  const faqText = 'FAQ';
  return (
    <div className={'w-full flex flex-col items-start gap-5'}>
      <h3 className={'text-3xl font-medium text-gray-600'}>{faqText}</h3>
      <AccordionRoot className={'w-full space-y-3'} type={'multiple'}>
        {QnA.map(({ id, q, a }) => {
          return (
            <AccordionItem key={id} className={''} value={id}>
              <AccordionTrigger
                className={
                  'text-xl text-gray-700 border-b-2 border-b-gray-300 w-full text-left py-3 flex items-center justify-between group'
                }>
                {q}
                <ChevronDownOutline
                  className={'w-6 h-6 text-gray-600 group-data-[state=open]:rotate-180'}
                />
              </AccordionTrigger>
              <AccordionContent className={'text-xl py-5 px-3 bg-gray-100 text-gray-700'}>
                {a}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </AccordionRoot>
    </div>
  );
};
