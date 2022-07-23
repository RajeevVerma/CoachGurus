import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import userService from '@services/user-service';
import { ParamMissingError } from '@shared/errors';
import addressRouter from './address-router';

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
    addresses: '/:userPk/addresses',
    saveProfilePic: '/:pk/profile-pic',
    saveCoverPic: '/:pk/cover-pic',
    saveActivityPics: '/:pk/activity-pics'
} as const;

/**
 * Address routes
 */
router.use(paths.addresses, addressRouter);

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

/**
 * Save profile pic
 */
router.post(paths.saveProfilePic, async (req: Request, res: Response) => {
    const { pk } = req.params;
    const profilePic = req.body;
    console.log(profilePic);
    if (!pk) {
        throw new ParamMissingError();
    }
    await userService.saveProfilePic(pk, profilePic.url);

    res.status(OK).end();
});

/**
 * Save cover pic 
 */
router.post(paths.saveCoverPic, async (req: Request, res: Response) => {
    const { pk } = req.params;
    const coverPic = req.body;
    if (!pk) {
        throw new ParamMissingError();
    }
    await userService.saveCoverPic(pk, coverPic.url);

    res.status(OK).end();
});

/**
 * Save activity pics 
 */
router.post(paths.saveActivityPics, async (req: Request, res: Response) => {
    const { pk } = req.params;
    const activityPic = req.body;
    console.log(activityPic);
    if (!pk) {
        throw new ParamMissingError();
    }
    await userService.saveActivityPics(pk, activityPic.urls);

    res.status(OK).end();
});

// Export default
export default router;
