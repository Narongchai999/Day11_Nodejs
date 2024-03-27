module.exports = (app) =>{
    const project = require("../controllers/project.controller");

    const router = require('express').Router();

    router.get('/', project.findAll);

    app.use('/projects', router);
};