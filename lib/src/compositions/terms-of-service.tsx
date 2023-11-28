import { wrapPage } from '@elements/compositions/wrap-page';
import termsMarkdownString from '@elements/markdown/terms-of-service.md?raw';
import Markdown from 'react-markdown';

const TermsOfService = wrapPage(() => {
  return <Markdown className={'prose'}>{termsMarkdownString}</Markdown>;
});

export default TermsOfService;
