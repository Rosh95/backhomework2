"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const video_router_1 = require("./routes/video-router");
const videosData_1 = require("./videosData");
const app = (0, express_1.default)();
const port = process.env.port || 3001;
const parserMiddleWare = (0, body_parser_1.default)({});
app.use(parserMiddleWare);
let baseUrl = '/hometask_01/api';
app.use(baseUrl + '/videos', video_router_1.videosRouter);
app.delete('/testing/all-data', (req, res) => {
    if (videosData_1.videoData.length > 0) {
        videosData_1.videoData.splice(0);
        res.send(204);
        return;
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
