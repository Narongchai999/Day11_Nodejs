module.exports = (app) =>{
    const company = require("../controllers/company.controller");

    const router = require('express').Router();

    router.get('/', company.findAll);

    router.get('/edit-company/:id', company.findOne);

    app.use('/companies', router);
};