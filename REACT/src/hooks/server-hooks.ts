import { IResponse, IUser } from 'models';
import { AmplifyService } from './amplify.service';

const { getLoggedInUser } = new AmplifyService();

export function ServerHooks() {
  const getUser = async (mobilePhone: string): Promise<IResponse> => {
    const { signInUserSession } = await getLoggedInUser();

    return await fetch(`/api/users/get/${mobilePhone}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${signInUserSession?.accessToken.jwtToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<IResponse>;
    });
  };

  const updateUser = async (user: IUser) => {
    const { signInUserSession } = await getLoggedInUser();
    await fetch('/api/users/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${signInUserSession?.accessToken.jwtToken}`,
      },
      body: JSON.stringify(user),
    });
  };

  return {
    updateUser,
    getUser,
  };
}
