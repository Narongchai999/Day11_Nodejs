const express = require('express');//หาในไลเบอรี่
//const { route } = require('./routes/test.route');
const app = express(); //เก็บตัวexpress ลงตัวแปร app
require("dotenv").config();
const PORT = process.env.APP_PORT;//.เข้าenv แล้ว .ใช้APP_PORTใน .env

//parse request of content-type - application/json
app.use(express.json());//ให้ยอมรับjson

//parse request of content-type - application/x-www-urlencoded
app.use(express.urlencoded({ extended: true}));

const db = require('./app/models');
db.sequelize.sync({force:false}).then(()=>{
    console.log('Database is syncing...');//แสดงผล
});

app.get('/', (req,res)=>{
    res.send("Default Route");
});

//ไปยังไฟล html ต่างๆ ลิ้งเป็นหน้าเว็บ
//app.get('/', (req,res)=>{
//    res.sendFile(__dirname + '/HTML/home.html');//__dirname ช่วยระบุเส้นทางไปยังไดเรกทอรี
//});
//app.get('/about/cat', (req,res)=>{
//    res.sendFile(__dirname + '/HTML/Day2.html');
//});
//app.get('/about', (req,res)=>{
//    res.sendFile(__dirname + '/HTML/about.html');
//});
//app.get('/about/me', (req,res)=>{
//    res.sendFile(__dirname + '/HTML/aboutme.html');
//});

//app.get('/', (req,res)=>{
//    res.send("Home");
//});
//app.get('/about', (req,res)=>{ // /ไปตามหน้าเว็บ
//    res.send("About");
//});
//app.get('/about/me', (req, res) => {
//    res.send("About ME");
//});

//app.get('/', function(request,response){ //เขียนให้สั้นลงโดยลบ function แล้วเติม => ข้างหลัง
//    response.send('Hello World!') //แสดงผลตรงนี้
//});

require("./app/routes/employee.route")(app);

app.listen(PORT, ()=>{//ทำให้แสดงในหน้าเว็บได้ node server.js ในcmd เพื่อในserver run
    console.log(`Server is runing on port ${PORT}`); //ใช้``เพื่อให้เขียนตัวแปรในข้อความได้แต่ต้องครอบด้วย ${}
    //console.log("Server is runing on port"+PORT);
    //เข้าไปที่เว็บ http://localhost:5000/
});