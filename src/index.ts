import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import {videosRouter} from './routes/video-router';
import {videoData} from './videosData';

const app = express();

const port = process.env.port || 3001;

const parserMiddleWare = bodyParser({});
app.use(parserMiddleWare)

let baseUrl = '/hometask_01/api'

app.use(baseUrl + '/videos', videosRouter)


app.delete('/testing/all-data', (req: Request, res: Response) => {
    if (videoData.length > 0) {
        videoData.splice(0)
        res.send(204)
        return;
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})