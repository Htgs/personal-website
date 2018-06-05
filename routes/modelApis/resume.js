const Router = require('koa-router');

const resumeController = require('../../app/controller/http/resumeController');

const {resource} = require('../../utils/route');

const resume = new Router({
    prefix: '/resume',
});

// resume
//     .get('/all', resumeController['all']);

resource(resume, resumeController, {
    // only: ['index'],
    // except: ['show', 'destory'],
});

module.exports = resume;
