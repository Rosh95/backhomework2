import {Request, Response, Router} from 'express';
import {videoData, VideoType} from '../videosData';
import { newPostVideoValidate, updatePostVideoValidate} from '../validation/videosValidation';

export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videoData)
})

videosRouter.get('/:id', (req: Request, res: Response) => {
    let findVideo: VideoType | undefined = videoData.find(m => m.id === +req.params.id)
    if (findVideo) {
        res.status(200).send(findVideo)
        return;
    }
    res.send(404)
})

videosRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videoData.length; i++) {
        if (videoData[i].id === +req.params.id) {
            videoData.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

videosRouter.post('/', (req: Request, res: Response) => {
    let err = newPostVideoValidate(req.body)
    if (err.length > 0) {
        res.status(400).send(err);
        return;
    }
    const createdAt = new Date();
    const publicationDate = new Date(createdAt.getTime() + 86400000);
    let newVideo: VideoType = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    videoData.push(newVideo);

    res.status(201).send(newVideo)

})

videosRouter.put('/:id', (req: Request, res: Response) => {
    //   let findVideo: VideoType | undefined = videoData.find(m => m.id === +req.params.id)
    let videoIndex = videoData.findIndex(m => m.id === +req.params.id)
    if (videoIndex < 0) {
        res.send(404);
        return;
    }

    let err = updatePostVideoValidate(req.body)
    if (err.length > 0) {
        res.status(400).send(err);
        return;
    }


    const updateVideo: VideoType = {
        ...videoData[videoIndex],
        ...req.body
    }
    videoData.splice(videoIndex, 1, updateVideo)
    res.status(201).send(updateVideo)

})
