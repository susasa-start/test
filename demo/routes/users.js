var express = require('express');
var router = express.Router();
//连接数据库
// const mongoose = require('mongoose');
const usersModel = require('../modules/usersModel')

// mongoose.connect('mongodb://localhost:27017/2006', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     // we're connected!
//     console.log("we're connected!")
// });

// var UsersSchema = mongoose.Schema({
//     username: String,
//     password: String,
//     phone: String
// });
// var usersModel = mongoose.model('users', UsersSchema);

// 注册
router.post('/register', (req, res, next) => {
        //拿到数据，查询数据库
        const { username } = req.body;
        usersModel.find({ username }, (err, doc) => {
            if (err) throw err;
            if (doc.length) {
                res.json({
                    status: 1,
                    msg: "用户名已存在"
                })
            } else {
                //实例化一个对象
                const usersInstance = new usersModel(req.body);
                usersInstance.save(err => {
                    if (err) throw err;
                    res.json({
                        status: 0,
                        msg: "注册成功"
                    })
                })

            }

        })


    })
    //登录
router.post('/login', (req, res, next) => {
    // console.log(req.body)
    const { username, password } = req.body;
    usersModel.findOne({ username }, (err, doc) => {
        if (err) throw err;
        if (doc) {
            if (password === doc.password) {
                res.json({
                    status: 0,
                    msg: "登录成功"
                })
            } else {
                res.json({
                    status: 2,
                    msg: "密码错误"
                })
            }
        } else {
            res.json({
                status: 1,
                msg: "用户名不存在"
            })
        }
    })
})

module.exports = router;