import { VerifyOtp as Component } from '@elements/compositions/auth/verify-otp';
import { mockStory } from '@story/utils/mock-story';
import { store } from '@story/stores/auth/verify-otp';

export default {
  title: 'Compositions/Auth/VerifyOtp',
  component: Component,
};

export const VerifyOtp = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});
