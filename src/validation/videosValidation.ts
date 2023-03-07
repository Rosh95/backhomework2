const availableResolutions: Array<string> = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']

function contains(what: Array<string>, where: Array<string>) {
    for (let i = 0; i < what.length; i++) {
        if (where.indexOf(what[i]) == -1) return false;
    }
    return true;
}

type newPostVideoValidateType = {
    title: string,
    author: string,
    availableResolutions: Array<string>

}

type ErrorsType = {
    message: string,
    field: string
}

type updateVideoType = {
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    createdAt?: string,
    publicationDate?: string,
    availableResolutions?: string[];
}
export const newPostVideoValidate = (req: newPostVideoValidateType) => {
    let errorsMessages: Array<ErrorsType> = [];

    if (!req.title || !req.title.trim() || req.title.length > 40) {
        errorsMessages.push({
            message: 'Title should be less then 40 symbols',
            field: 'Message'
        })
    }
    if (!req.author || !req.author.trim() || req.author.length > 20) {
        errorsMessages.push({
            message: 'Author should be less then 40 symbols',
            field: 'Author'
        })
    }

    if (req.availableResolutions) {
        if (req.availableResolutions.length === 0 || !(contains(req.availableResolutions, availableResolutions))) {
            errorsMessages.push({
                message: `AvailableResolutions should be one of ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'] `,
                field: 'AvailableResolutions'
            })
        }
    }


    return errorsMessages;
}

export const updatePostVideoValidate = ( req: updateVideoType) => {

    let errorsMessages: Array<ErrorsType> = [];

    if (!req.title || !req.title.trim() || req.title.length > 40) {
        errorsMessages.push({
            message: 'Title should be less then 40 symbols',
            field: 'Message'
        })
    }
    if (!req.author || req.title.trim() === '' || req.author.length > 20) {
        errorsMessages.push({
            message: 'Author should be less then 20 symbols',
            field: 'Author'
        })
    }

    if (req.availableResolutions) {
        if (req.availableResolutions.length === 0 || !(contains(req.availableResolutions, availableResolutions))) {
            errorsMessages.push({
                message: `AvailableResolutions should be one of ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'] `,
                field: 'AvailableResolutions'
            })
        }
    }

    req.canBeDownloaded ? req.canBeDownloaded : req.canBeDownloaded = false;

    if (req.minAgeRestriction) {
        if (req.minAgeRestriction < 1 || req.minAgeRestriction > 18) {
            errorsMessages.push({
                message: `Min Age Restriction should more than 1 and less then 18 or null`,
                field: 'AvailableResolutions'
            })
        }
    }
    else {
        req.minAgeRestriction = null;
    }

    (typeof req.publicationDate) !== 'string' ?
        errorsMessages.push({
            message: `Publication Date should string`,
            field: 'AvailableResolutions'
        }) : req.publicationDate;


    return errorsMessages;
}