import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import userRouter from './user-router';
import searchRouter from './search-router';
import configRouter from './config-rouer';


// Export the base-router
const baseRouter = Router();

// health check end point
baseRouter.get('/health', async (_: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({ alive: 'yep' });
});

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/search', searchRouter);
baseRouter.use('/config', configRouter);

// Export default.
export default baseRouter;
