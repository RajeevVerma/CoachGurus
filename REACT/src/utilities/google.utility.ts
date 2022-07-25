import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { IAddress } from 'models';

export const GoogleInit = () => {
  GoogleAuth.initialize({
    clientId:
      '1042016617653-jderfq6e5acm8mh0ql3v096mpb2kscua.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
  });
};

export const GoogleLogin = (): Promise<User> => GoogleAuth.signIn();

export const fetchAddressFromLocation = (address: any): IAddress => {
  return {
    addr1: '',
    city: '',
    country: '',
    lat: '1',
    long: '1',
    name: '',
    pincode: 1,
    state: '',
  };
};
