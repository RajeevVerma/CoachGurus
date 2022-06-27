import { IUser } from '../models';

export function loginHook() {

  const login = async (user: IUser) => {
    await fetch('/api/users/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((response: Response) => {
        debugger
      });
  }

  return {
    login,
  };
}