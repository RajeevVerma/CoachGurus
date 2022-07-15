import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import userService from '@services/user-service';
import { ParamMissingError } from '@shared/errors';

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const paths = {
    get: '/get/:pk',
    getAll: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
    updateUserProfile: '/updateprofile', // depecrated, isntead use micro api for specific task
    addAddress: '/addAddress/:userPk',
} as const;

/**
 * Get user.
 */
router.get(paths.get, async (req: Request, res: Response) => {
    const { pk } = req.params;
    console.log('pk', pk);
    const users = await userService.get(pk);

    return res.status(OK).json(users);
});

/**
 * Get all users.
 */
router.get(paths.getAll, async (_: Request, res: Response) => {
    const users = await userService.getAll();

    return res.status(OK).json({ users });
});

/**
 * Add one user.
 */
router.post(paths.add, async (req: Request, res: Response) => {
    const user = req.body;
    console.log("req", req.body);
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    const data = await userService.addOne(user);
    return res.status(CREATED).json(data);
});

/**
 * Update one user.
 */
router.put(paths.update, async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.updateOne(user);
    return res.status(OK).end();
});

/**
 * Delete one user.
 */
router.delete(paths.delete, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.delete(id);
    return res.status(OK).end();
});

/**
 * Update user profile
 */
router.post(paths.updateUserProfile, async (req: Request, res: Response) => {
    const userProfile = req.body;
    console.log(userProfile);

    await userService.updateUserProfile(userProfile)
    return res.status(OK).end();
});

router.post(paths.addAddress, async (req: Request, res: Response) => {
    const { userPk } = req.params;
    const address = req.body;
    if (!userPk) {
        throw new ParamMissingError();
    }

    await userService.addAddressForUser(userPk, address);
    return res.status(OK).end();
});

// Export default
export default router;
