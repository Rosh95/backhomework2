"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const videosData_1 = require("../videosData");
const videosValidation_1 = require("../validation/videosValidation");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter.get('/', (req, res) => {
    res.status(200).send(videosData_1.videoData);
});
exports.videosRouter.get('/:id', (req, res) => {
    let findVideo = videosData_1.videoData.find(m => m.id === +req.params.id);
    if (findVideo) {
        res.status(200).send(findVideo);
        return;
    }
    res.send(404);
});
exports.videosRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < videosData_1.videoData.length; i++) {
        if (videosData_1.videoData[i].id === +req.params.id) {
            videosData_1.videoData.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
exports.videosRouter.post('/', (req, res) => {
    let err = (0, videosValidation_1.newPostVideoValidate)(req.body);
    if (err.length > 0) {
        res.status(400).send({ errorsMessages: err });
        return;
    }
    const createdAt = new Date();
    const publicationDate = new Date(createdAt.getTime() + 86400000);
    let newVideo = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    videosData_1.videoData.push(newVideo);
    res.status(201).send(newVideo);
});
exports.videosRouter.put('/:id', (req, res) => {
    //   let findVideo: VideoType | undefined = videoData.find(m => m.id === +req.params.id)
    let videoIndex = videosData_1.videoData.findIndex(m => m.id === +req.params.id);
    if (videoIndex < 0) {
        res.send(404);
        return;
    }
    let err = (0, videosValidation_1.updatePostVideoValidate)(req.body);
    if (err.length > 0) {
        res.status(400).send({ errorsMessages: err });
        return;
    }
    const updateVideo = Object.assign(Object.assign({}, videosData_1.videoData[videoIndex]), req.body);
    videosData_1.videoData.splice(videoIndex, 1, updateVideo);
    res.status(201).send(updateVideo);
});
