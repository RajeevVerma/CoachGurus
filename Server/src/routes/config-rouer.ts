import { ParamMissingError } from '@shared/errors';
import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

import configService from '@services/config-service';

const paths = {
    getSignedUrl: '/signed-url/:pk/:type/:dir/:contentType',
    getSignedUrls: '/signed-urls/:pk/:dir/:contentType'
};

var router = Router();

router.get(paths.getSignedUrl, async (req: Request, res: Response) => {
    console.log('get signed url');
    const { pk, type, dir, contentType } = req.params;

    if (!pk || !type) {
        throw new ParamMissingError();
    }
    const signedUrl = await configService.getPresignedUploaUrl(dir, pk, contentType, type);

    console.log('returning the signed urls ', signedUrl);

    res.status(StatusCodes.OK).json(signedUrl);
});

router.post(paths.getSignedUrls, async (req: Request, res: Response) => {
    const { pk, dir, contentType } = req.params;
    const fileNames = req.body;

    if (!pk) {
        throw new ParamMissingError();
    }
    const signedUrls = await configService.getPresignedUploaUrls(dir, pk, contentType, fileNames);
    res.status(StatusCodes.OK).json({ signedUrls });
});

export default router;