import {Request, Response, Router} from 'express';
import {videoData} from '../videosData';

export const testRouter = Router({})


testRouter.delete('/', (req: Request, res: Response) => {
    videoData.splice(0)

    res.send(204)
})