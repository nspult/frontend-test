import superagentPromise from 'superagent-promise';

import _superagent from 'superagent/dist/superagent';

const superagent = superagentPromise(_superagent, global.Promise);

let API_ROOT = '/api';

const handleErrors = error => {
    if (error !== null) {
        if (error.response && error.response.text) {
            error.data = JSON.parse(error.response.text);
        } else {
            error.data = 'Ошибка';
        }
        return error
    }
};

const responseBody = res => {
    if (res.text) {
        return JSON.parse(res.text).result;
    }
};

const tokenPlugin = req => {

};

const requests = {
    del: (url, params) =>
        superagent
            .del(`${API_ROOT}${url}`)
            .query(params)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: (url, params) =>
        superagent
            .get(`${API_ROOT}${url}`)
            .query(params)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),

    postFile: (url, files, body = {}) => {

        const req = superagent.post(`${API_ROOT}${url}`);

        Object.keys(body).map(function (key) {
            req.field(key, body[key]);
        });

        if (Array.isArray(files)) {
            files.map((item) => {
                req.attach(item.fileName, item.file)
            });
        } else {
            req.attach(files.fileName, files.file);

        }

        return req.use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody)
    }

};

const User = {
    registration: (params) =>
        requests
            .post('/registration.php', params),
};

export {
    User,
};
