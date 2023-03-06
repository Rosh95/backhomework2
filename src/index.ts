import express from 'express'
import bodyParser from 'body-parser';
import {videosRouter} from './routes/video-router';
import {testRouter} from './routes/test-router';

const app = express();

const port = process.env.port || 3001;

const parserMiddleWare = bodyParser({});
app.use(parserMiddleWare)

let baseUrl = '/hometask_01/api'

app.use(baseUrl + '/videos', videosRouter)
app.use(baseUrl + '/testing/all-data', testRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})