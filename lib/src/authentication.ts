import SuperTokens from 'supertokens-web-js';
import Session, { doesSessionExist } from 'supertokens-web-js/recipe/session';
import Passwordless, {
  consumeCode,
  createCode,
  getLoginAttemptInfo,
  resendCode,
} from 'supertokens-web-js/recipe/passwordless';
import { AppInfoUserInput } from 'supertokens-web-js/types';

export const init = (authConfig: AppInfoUserInput) => {
  const { apiDomain, apiBasePath, appName } = authConfig;
  SuperTokens.init({
    appInfo: {
      apiDomain,
      appName,
      apiBasePath,
    },
    recipeList: [Session.init({}), Passwordless.init({})],
  });
};

export async function sendOtp({ email }: { email: string }) {
  try {
    await createCode({ email });
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you,
      // or if the input email / phone number is not valid.
      window.alert(err.message);
    } else {
      window.alert('Oops! Something went wrong.');
    }
  }
}

export async function resendOtp() {
  try {
    let response = await resendCode();

    if (response.status === 'RESTART_FLOW_ERROR') {
      // this can happen if the user has already successfully logged in into
      // another device whilst also trying to login to this one.
      window.alert('Login failed. Please try again');
      window.location.assign('/auth');
    } else {
      // OTP resent successfully.
      window.alert('Please check your email for the OTP');
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert('Oops! Something went wrong.');
    }
  }
}

export async function hasOtpBeenSent() {
  return (await getLoginAttemptInfo()) !== undefined;
}

export async function consumeOtp({ otp }: { otp: string }): Promise<any> {
  try {
    const response = await consumeCode({ userInputCode: otp });

    if (response.status === 'OK') {
      if (response.createdNewUser) {
        return { newUser: true, user: response.user };
      } else {
        return { newUser: false, user: response.user };
      }
    } else if (response.status === 'INCORRECT_USER_INPUT_CODE_ERROR') {
      throw {
        maxOtpAttempts: response.maximumCodeInputAttempts,
        failedOtpAttempts: response.failedCodeInputAttemptCount,
      };
    } else if (response.status === 'EXPIRED_USER_INPUT_CODE_ERROR') {
      throw { expiredOtp: true };
    } else {
      throw { unknownError: true };
    }
  } catch (err: any) {
    // TODO Handle this properly
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      throw err;
    }
  }
}

export async function signOut() {
  await Session.signOut();
}

export async function sessionExists() {
  return await doesSessionExist();
}
