import { ICustomLogin, ISocialUser } from '../models';

export function loginHook() {
  const socialLogin = async (user: ISocialUser) => {
    await fetch('/api/users/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };

  const customLogin = async (user: ICustomLogin) => {
    await fetch('/api/unauthenticatedUsers/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  };

  return {
    customLogin,
    socialLogin,
  };
}
