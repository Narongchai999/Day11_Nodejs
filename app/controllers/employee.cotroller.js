const db = require('../models');
const Employee = db.employee;
const Setting = db.setting;

exports.findAll = (req, res) => {
    //res.send("findAll"); //ตัวแสดงผล
    try {
        Employee.findAll({
            attributes: ["id", "name", "position"],

            include: [{
                model: Setting,
                attributes: ["theme"]
            }]
        })
            .then(employee => {
                res.send(employee);//เขียนแสดงผลแบบง่าย
                //res.json(employee);
                //res.status(200).json(employee);//บอกสเตตัส
            })
            .catch(error => {
                console.log(error.massage);
            });
    } catch (error) {
        console.log(error);
    }
};

exports.create = (req, res) => {
    try {
        if (!req.body.name || !req.body.position) { //ตรวจสอบค่าว่างเปล่าในname และ  
            res.status(400).json({ massage: "ไม่ได้ใส่อะไรเลย!!!!!" });
            return;
        }
        const employeeObj = {//รับค่า
            name: req.body.name,
            position: req.body.position
        }
        Employee.create(employeeObj)
            .then((data) => {
                // Insert to setting

                Setting.create({
                    theme: req.body.theme,
                    employeeId: data.id
                });
                res.status(200).json({ massage: "สร้างใหม่ละค้าบ" });
            })
            .catch(error => {
                res.status(400).json({ massage: error.massage });
            });
    } catch (error) {
        res.sendStatus(500);
    }
};

exports.findOne = (req, res) => {
    try {
        const id = req.params.id;
        Employee.findByPk(id)
            .then(data => {
                console.log(data);
                res.status(200).json(data)
            })
            .catch(error => {
                res.status(400).json({ massage: error.massage });
            })
    } catch (error) {
        //console.log(massage.error)
        res.status(500).json({ massage: error.massage });
    }
};


exports.update = (req, res) => {
    try {
        const id = req.params.id;// เป็นตัวที่อัพเดต
        const employeeObj = {
            name: req.body.name,
            position: req.body.position
        }
        Employee.update(employeeObj, {
            where: { id: id },//ตัวหลังมากจาก req.params.id;
        })
            .then(data => {
                if (data == 1) {
                    res.status(200).json({ massage: "อัพเดตเสร็จแล้ว!!!" });
                }
            })
            .catch(error => {
                res.status(400).json({ massage: error.massage });
            });
    } catch (error) {
        res.status(500).json({ massage: error.massage });
    }

};
exports.delete = (req, res) => {
    try {

        Employee.destroy({ where: { id: req.params.id } })
            .then(data => {
                if (data == 1) {
                    res.status(200).json({ massage: "ลบหมดละ" });
                }
            })
            .catch(error => {
                res.status(400).json({ massage: error.massage });
            })
    } catch (error) {
        res.status(500).json({ massage: error.massage });
    }
};