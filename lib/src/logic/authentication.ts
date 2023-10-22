import { dispatch, evt, invalidateAsyncSub, invalidateAsyncSubs, sub } from '@elements/store';
import { consumeOtp, resendOtp, sendOtp, sessionExists, signOut } from '@elements/authentication';
import { rpcPost } from '@elements/rpc';
import type { EventHandler, EventHandlerArgs } from '@elements/store/register';
import type { Events as AllEvents } from '@elements/store/types';

export type ResendOtpState = 'idle' | 'waiting' | 'resending';

export const MAX_OTP_DIGITS = 6;
export const WAIT_TIME_MS = 30000;

export type Subs = {
  'auth.sign-in/visible': {
    params: {};
    result: boolean;
  };
  'auth.session/exists': {
    params: {};
    result: boolean;
  };
  'auth.sign-in/email': {
    params: {};
    result: string;
  };
  'auth.sign-in/sending-otp': {
    params: {};
    result: boolean;
  };
  'auth.verify-otp/otp': {
    params: {};
    result: string;
  };
  'auth.verify-otp/visible': {
    params: {};
    result: boolean;
  };
  'auth.verify-otp/verifying': {
    params: {};
    result: boolean;
  };
  'auth.verify-otp/resend-otp-state': {
    params: {};
    result: ResendOtpState;
  };
  'auth.verify-otp/error': {
    params: {};
    result: any;
  };
  'auth.verify-otp/wait-seconds': {
    params: {};
    result: number;
  };
  'user.registration.input/name': {
    params: {};
    result: string;
  };
  'user.registration/pending': {
    params: {};
    result: boolean;
  };
  'auth.verify-otp/otp-sent': {
    params: {};
    result: boolean;
  };
};

export type Events = {
  'auth.sign-in/initiate': {
    params?: {};
  };
  'auth/sign-out': {
    params: {};
  };
  'auth.sign-in/send-otp': {
    params: {
      email: string;
    };
  };
  'auth.sign-in/close': {
    params: {};
  };
  'auth.sign-in/update-email': {
    params: {
      value: string;
    };
  };
  'auth.session/sync': {
    params: {};
  };
  'auth.verify-otp/resend-otp': {
    params: {};
  };
  'auth.verify-otp/go-back': {
    params: {};
  };
  'auth.verify-otp/close': {
    params: {};
  };
  'auth.verify-otp/update-otp': {
    params: {
      value: string;
    };
  };
  'auth.verify-otp/verify-otp': {
    params: {
      otp: string;
    };
  };
  'auth.verify-otp/focus-input': {
    params: {};
  };
  'user.registration/done': {
    params: {};
  };
  'user.registration.input.name/update': {
    params: { value: string };
  };
};

export const authenticationSlice = () => ({
  'authentication/state': {
    'auth.session/exists': false,
    'auth.sign-in/visible': false,
    'auth.sign-in.email/input': '',
    'auth.sign-in.sending/otp': false,
    'auth.sign-in/disallow-close': false,
    'auth.verify-otp/input': '',
    'auth.verify-otp/visible': false,
    'auth.verify-otp/verifying': false,
    'auth.verify-otp.resend-otp/state': 'idle',
    'auth.verify-otp/error': null,
    'auth.verify-otp/otp-wait-seconds': WAIT_TIME_MS / 1000,
    'user.registration.input/name': '',
  },
});

sub('auth.sign-in/visible', ({ state }) => state['authentication/state']['auth.sign-in/visible']);

sub('auth.session/exists', ({ state }) => state['authentication/state']['auth.session/exists']);

sub('auth.sign-in/email', ({ state }) => state['authentication/state']['auth.sign-in.email/input']);

sub(
  'auth.sign-in/sending-otp',
  ({ state }) => state['authentication/state']['auth.sign-in.sending/otp']
);

sub('auth.verify-otp/otp', ({ state }) => state['authentication/state']['auth.verify-otp/input']);

sub(
  'auth.verify-otp/visible',
  ({ state }) => state['authentication/state']['auth.verify-otp/visible']
);

sub(
  'auth.verify-otp/verifying',
  ({ state }) => state['authentication/state']['auth.verify-otp/verifying']
);

sub(
  'auth.verify-otp/resend-otp-state',
  ({ state }) => state['authentication/state']['auth.verify-otp.resend-otp/state']
);

sub('auth.verify-otp/error', ({ state }) => state['authentication/state']['auth.verify-otp/error']);

sub(
  'auth.verify-otp/wait-seconds',
  ({ state }) => state['authentication/state']['auth.verify-otp/otp-wait-seconds']
);

sub(
  'user.registration.input/name',
  ({ state }) => state['authentication/state']['user.registration.input/name']
);

evt('auth.sign-in/initiate', ({ setState }) => {
  setState((state: any) => {
    state['authentication/state']['auth.sign-in/visible'] = true;
  });
});

evt('auth/sign-out', async ({}) => {
  await signOut();
  dispatch('auth.session/sync');
});

evt('auth.sign-in/send-otp', async ({ setState, params }) => {
  const { email } = params;

  setState((state: any) => {
    state['authentication/state']['auth.sign-in.sending/otp'] = true;
  });

  await sendOtp({ email });

  setState((state: any) => {
    state['authentication/state']['auth.sign-in.sending/otp'] = false;
    state['authentication/state']['auth.sign-in/visible'] = false;
    state['authentication/state']['auth.verify-otp/visible'] = true;
  });
});

evt('auth.sign-in/close', ({ setState }) => {
  setState((state: any) => {
    state['authentication/state']['auth.sign-in/visible'] = false;
    state['authentication/state']['auth.sign-in.email/input'] = '';
  });
});

evt('auth.sign-in/update-email', ({ setState, params }) => {
  setState((state: any) => {
    state['authentication/state']['auth.sign-in.email/input'] = params.value;
  });
});

evt('auth.session/sync', async ({ setState }) => {
  const exists = await sessionExists();
  setState((state: any) => {
    state['authentication/state']['auth.session/exists'] = exists;
  });
});

function countdown(
  durationMs: number,
  intervalMs: number,
  onInterval: (info: { timeLeftMs: number }) => void,
  onComplete: () => void
): void {
  let timeLeftMs = durationMs;
  const intervalFunc = () => {
    if (timeLeftMs <= 0) {
      clearInterval(intervalId);
      onComplete();
    } else {
      timeLeftMs -= intervalMs;
      onInterval({ timeLeftMs });
    }
  };

  const intervalId = setInterval(intervalFunc, intervalMs);
}

evt('auth.verify-otp/resend-otp', async ({ setState }) => {
  setState((state: any) => {
    state['authentication/state']['auth.verify-otp.resend-otp/state'] = 'resending';
  });

  await resendOtp();

  setState((state: any) => {
    state['authentication/state']['auth.verify-otp.resend-otp/state'] = 'waiting';
  });

  countdown(
    WAIT_TIME_MS,
    1000,
    ({ timeLeftMs }) => {
      setState((state: any) => {
        state['authentication/state']['auth.verify-otp/otp-wait-seconds'] = Math.ceil(
          timeLeftMs / 1000
        );
      });
    },
    () => {
      setState((state: any) => {
        state['authentication/state']['auth.verify-otp.resend-otp/state'] = 'idle';
        state['authentication/state']['auth.verify-otp/otp-wait-seconds'] = WAIT_TIME_MS / 1000;
      });
    }
  );
});

evt('auth.verify-otp/go-back', ({ setState }) => {
  setState((state: any) => {
    state['authentication/state']['auth.verify-otp/visible'] = false;
    state['authentication/state']['auth.sign-in/visible'] = true;
    state['authentication/state']['auth.verify-otp/input'] = '';
  });
});

evt('auth.verify-otp/close', ({ setState }) => {
  setState((state: any) => {
    state['authentication/state']['auth.verify-otp/visible'] = false;
    state['authentication/state']['auth.verify-otp/input'] = '';
    state['authentication/state']['auth.verify-otp/error'] = null;
    state['authentication/state']['auth.sign-in.email/input'] = '';
  });
});

evt('auth.verify-otp/update-otp', ({ setState, params }) => {
  const otp = params.value;
  setState((state: any) => {
    state['authentication/state']['auth.verify-otp/input'] = otp;
  });
});

evt('auth.verify-otp/verify-otp', async ({ setState, params }) => {
  const { otp } = params;
  try {
    setState((state: any) => {
      state['authentication/state']['auth.verify-otp/verifying'] = true;
    });

    const { user: authUser, newUser } = await consumeOtp({ otp });

    if (newUser) {
      await rpcPost('user/create', {
        'user/emails': authUser.emails,
        'auth.user/id': authUser.id,
      });
    }

    await invalidateAsyncSubs([['current.user/id'], ['current.user/name']]);

    setState((state: any) => {
      state['authentication/state']['auth.verify-otp/verifying'] = false;
      state['authentication/state']['auth.verify-otp/visible'] = false;
      state['authentication/state']['auth.session/exists'] = true;
      state['authentication/state']['auth.verify-otp/input'] = '';
      state['authentication/state']['auth.sign-in.email/input'] = '';
    });

    dispatch('alert/flash', {
      message: 'Welcome! You have successfully signed in.',
      kind: 'success',
    });
  } catch (error) {
    setState((state: any) => {
      state['authentication/state']['auth.verify-otp/verifying'] = false;
      state['authentication/state']['auth.verify-otp/error'] = error;
    });
  }
});

evt('auth.verify-otp/focus-input', ({}) => {});

evt('user.registration.input.name/update', ({ setState, params }) => {
  setState((state: any) => {
    state['authentication/state']['user.registration.input/name'] = params.value;
  });
});

evt('user.registration/done', async ({ getState, read }) => {
  const name = getState()['authentication/state']['user.registration.input/name'];
  const currentUserId = read('current.user/id');

  await rpcPost('user.name/update', { value: name, 'user/id': currentUserId });

  await invalidateAsyncSub('user.registration/pending');
});

export function wrapRequireAuth<T extends keyof AllEvents>(fn: EventHandler<T>) {
  return async (args: EventHandlerArgs<T>) => {
    const { getState, dispatch } = args;
    const sessionExists = getState()['authentication/state']['auth.session/exists'];
    if (!sessionExists) {
      return dispatch('auth.sign-in/initiate');
    }
    return fn(args);
  };
}
