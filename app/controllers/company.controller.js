const db = require('../models');
const Employee = db.employee;
const Company = db.company;

exports.findAll = (req, res) => {
    try {
        Company.findAll({
            include: [{
                model: Employee,
                attributes: ["name", "position"]
            }]
        })
            .then(data => res.status(200).json(data))//สามารถลบ {} ตรงแอโร่ฟังชันแล้วเหลือบรรทัดเดียวได้
            .catch(error => res.status(400).json({ message: error.message }));//สามารถลบ {} ตรงแอโร่ฟังชันแล้วเหลือบรรทัดเดียวได้
    } catch (error) {
        res.status(500).json({ massage: error.massage });
    }
};

exports.findOne = (req, res) => {
    try {
        const id = req.params.id; //ตรงนี้ทำให้ค้นหาทีละรายการโดยใช้ id
        Company.findByPk(id, {
            include: [{
                model: Employee,
                attributes: ["name", "position"]
            }]
        })
            .then(data => res.status(200).json(data))
            .catch(error => res.status(400).json({ message: error.message }));
    } catch (error) {
        res.status(500).json({ massage: error.massage });
    }
};

