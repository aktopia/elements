import { OtpInput } from '@elements/components/otp-input';

export default {
  title: 'Components/OtpInput',
  component: OtpInput,
};

export function Examples() {
  return (
    <div className={'flex flex-col gap-10'}>
      <OtpInput num={6} onInputComplete={console.log} />
      <OtpInput num={4} onInputComplete={console.log} />
    </div>
  );
}
