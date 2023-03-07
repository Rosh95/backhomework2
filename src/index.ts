import express, {Request, Response} from 'express'
import {videosRouter} from './routes/video-router';
import {videoData} from './videosData';

const app = express();

const port = process.env.port || 3001;

const parserMiddleWare = express.json()
app.use(parserMiddleWare)

app.use('/videos', videosRouter)


app.delete('/testing/all-data', (req: Request, res: Response) => {
    if (videoData.length > 0) {
        videoData.splice(0)
        res.sendStatus(204)
        return;
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})