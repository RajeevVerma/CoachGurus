import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import addressService from '@services/address-service';
const { CREATED, OK } = StatusCodes;

const router = Router({ mergeParams: true });

// paths 
export const paths = {
    add: '/add',
    update: '/update',
    delete: '/delete/:pk/:sk'
};

// add address for the user
router.post(paths.add, async (req: Request, res: Response) => {
    const { userPk } = req.params;
    const address = req.body;
    if (!userPk) {
        throw new ParamMissingError();
    }

    const savedAddress = await addressService.addOrUpdateAddressForUser(userPk, address);
    return res.status(CREATED).json(savedAddress);
});

// update address for the user
router.post(paths.update, async (req: Request, res: Response) => {
    const { userPk } = req.params;
    const address = req.body;
    if (!userPk) {
        throw new ParamMissingError();
    }

    const savedAddress = await addressService.addOrUpdateAddressForUser(userPk, address);
    return res.status(CREATED).json(savedAddress);
});

// delete address
router.delete(paths.delete, async (req: Request, res: Response) => {
    const { userPk, pk, sk } = req.params;
    if (!userPk || !pk || !sk) {
        throw new ParamMissingError();
    }

    const savedAddress = await addressService.deleteUserAddress(pk, sk, userPk);
    return res.status(CREATED).json(savedAddress);
});

export default router;
