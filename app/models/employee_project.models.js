module.exports = (sequelize, Datatype) => {
    const db = require("../models");
    const Employee = db.employee;
    const Project = db.project;

    const Employee_project = sequelize.define("Employee_project", {
        employeeId: {
            type: Datatype.INTEGER,
            References:{
                model:Employee,
                key:'id'
            }
        },
        projectId: {
            type: Datatype.INTEGER,
            References:{
                model:Project,
                key:'id'
            }
        }
    });
    return Employee_project;
};