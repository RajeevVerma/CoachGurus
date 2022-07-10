import { ICustomLogin } from '../models';

export function ServerHooks() {
  const getUser = async (userId: string) => {
    await fetch(`/api/users/get/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  const updateUser = async (user: ICustomLogin, accessToken: string) => {
    await fetch('/api/users/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    });
  };

  return {
    updateUser,
    getUser,
  };
}
