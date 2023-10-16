import { wrapPage } from '@elements/compositions/wrap-page';
import privacyPolicyMarkdownString from '@elements/markdown/privacy-policy.md?raw';
import Markdown from 'react-markdown';

export const PrivacyPolicy = wrapPage(() => {
  return <Markdown className={'prose'}>{privacyPolicyMarkdownString}</Markdown>;
});
