import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { ParamMissingError } from '@shared/errors';
import searchService from '@services/search-service'

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const paths = {
    get: '/get/:endeavourId/:lat/:long',
} as const;

/**
 * Get all users.
 */
router.get(paths.get, async (req: Request, res: Response) => {
    debugger
    const { endeavourId, lat, long } = req.params;
    console.log(`endeavourId-${endeavourId}|lat-${lat}|long-${long}`);
    const gurus = await searchService.searchGurus(endeavourId, lat, long);
    console.log(gurus);
    return res.status(OK).json(gurus);
});

// Export default
export default router;
