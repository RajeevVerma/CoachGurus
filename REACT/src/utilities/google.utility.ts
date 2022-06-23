import { GoogleAuth, User } from "@codetrix-studio/capacitor-google-auth";

export const GoogleInit = () => {

    GoogleAuth.initialize({
        clientId: '1042016617653-jderfq6e5acm8mh0ql3v096mpb2kscua.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
    });
}

export const GoogleLogin = (): Promise<User> => GoogleAuth.signIn();
