import { IAddress } from '@models/shared';
import addressService from '@services/address-service'
import userService from '@services/user-service';

xdescribe('address-service - with db tests (this will save the information in db so only execute in the local/test environment)', () => {
    let addressTemplate: IAddress = {
        country: "India",
        pincode: 411001,
        addr2: "Rakshak Nagar",
        addr1: "Kharadi",
        city: "Pune",
        sk: "",
        state: "Maharashtra",
        pk: "",
        lat: "18.8827384",
        long: "72.9641223",
        endeavourId: "NA",
        name: "Location"
    };

    let phone = '07947328701';

    it(`should add address to for the user ${phone} and return created address`, async () => {
        // prepare 
        phone = '07947328701';
        let address: IAddress | undefined = addressTemplate;

        // act
        address = await addressService.addOrUpdateAddressForUser(phone, address);
        const user = await userService.get(phone);
        console.log(user.addresses);
        // assert 
        expect(user.addresses).toContain(address!);

    });

    it(`should not add address to for the user, if user does not exist`, async () => {
        // prepare 
        phone = 'VU-INVALID';
        let res = addressTemplate;
        res.name = "SHOULD NOT BE IN THE DATABASE";

        // assert
        await expectAsync(addressService.addOrUpdateAddressForUser(phone, res)).toBeRejectedWithError();

    });

    it(`should update address to for the user ${phone} and return updated address`, async () => {
        // prepare 
        let address: IAddress | undefined = addressTemplate;
        address.addr1 = 'updated value';
        address.sk = 'AD-165582258885700';
        address.pk = 'AD-India-Maharashtra-Pune-te7gk';
        phone = '07947328701';

        // act
        address = await addressService.addOrUpdateAddressForUser(phone, address);
        const user = await userService.get(phone);
        const userAddress = user.addresses.find((a, i, arr) => a.pk == address!.pk && a.sk == address!.sk);

        // assert 
        expect(userAddress).toBeDefined();
        expect(userAddress?.addr1).toBe('updated value');
    });

    it(`should not update address for the user if user does not exist`, async () => {
        // prepare 
        phone = 'VU-INVALID';
        let res = addressTemplate;
        res.addr1 = "1";
        res.sk = 'AD-165582258885700';
        res.pk = 'AD-India-Maharashtra-Pune-te7gk';

        // assert 
        await expectAsync(addressService.addOrUpdateAddressForUser(phone, res)).toBeRejectedWithError();
    });

    it(`should delete address to for the user ${phone}`, async () => {
        // prepare 
        const addressPk = 'AD-India-Maharashtra-Pune-te7g7';
        const addressSk = 'AD-165582183346800';

        // act
        await addressService.deleteUserAddress(addressPk, addressSk, phone);
        const user = await userService.get(phone);

        // assert 
        const res = user.addresses.find((addr, i, arr) => addr.sk == addressSk && addr.pk == addressPk);
        expect(res).toBeUndefined();
    });

    it(`should not delete address to for the user ${phone} if user does not exist`, async () => {
        // prepare 
        const addressPk = 'AD-India-Maharashtra-Pune-te7g7';
        const addressSk = 'AD-165582188564900';

        // assert
        await expectAsync(addressService.deleteUserAddress(addressPk, addressSk, phone)).toBeRejectedWithError();
    });
});