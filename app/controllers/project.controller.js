const db = require('../models');
const Employee = db.employee;
const Project = db.project;

exports.findAll = (req, res) => {
    try {
        Project.findAll({
            include: [{
                model: Employee,
                attributes: ["name"]
            }]
        })
            .then(data => res.status(200).json(data))//สามารถลบ {} ตรงแอโร่ฟังชันแล้วเหลือบรรทัดเดียวได้
            .catch(error => res.status(400).json({ message: error.message }));//สามารถลบ {} ตรงแอโร่ฟังชันแล้วเหลือบรรทัดเดียวได้
    } catch (error) {
        res.status(500).json({ massage: error.massage });
    }
};


