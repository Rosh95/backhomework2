import {VideoType} from '../videosData';

enum availableResolutions {P144, P240, P360, P480, P720, P1080, P1440, P2160}

export const newPostVideoValidate = (req: any) => {

    let arrErrors = []
    if (typeof req.title !== 'string' || req.title.length > 40) {
        arrErrors.push('error in title')
    }
    if (typeof req.author !== 'string' || req.title.length > 20) {
        arrErrors.push('error in author')
    }

    return arrErrors;
}