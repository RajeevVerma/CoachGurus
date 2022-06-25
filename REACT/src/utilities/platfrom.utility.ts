import { isPlatform } from "@ionic/react";

export class PlatFromUtility {

    public static isMobile(): boolean {

        return isPlatform('android')
            || isPlatform('mobile')
            || isPlatform('mobileweb')
            || isPlatform('iphone')
            || isPlatform('cordova')
            || isPlatform('capacitor');
    }

}
