var express = require('express');
var router = express.Router();
const path = require('path');
const studentsModel = require('../modules/studentsModel');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/upload'))
    },
    filename: function(req, file, cb) {

        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
})

var upload = multer({ storage: storage })

/* GET home page. */
//查询students表信息
router.get('/information', function(req, res, next) {
    // studentsModel.find({}, (err, doc) => {
    // if (err) throw err;
    // res.json({
    //     status: 0,
    //     result: doc
    // })
    // })
    const { page, count } = req.query;
    studentsModel.count({}, (err, con) => {
        if (err) throw err;
        studentsModel.find({}).limit(+count).skip((page - 1) * count).exec((err, doc) => {
            if (err) throw err;
            res.json({
                status: 0,
                result: doc,
                con: con //数据条数返回给前端
            })
        })
    })

});
//添加数据库
router.post('/add', (req, res, next) => {
        const instance = studentsModel(req.body); //实例化一个对象
        instance.save(err => {
            if (err) throw err;
            res.json({
                status: 0,
                msg: "添加成功"
            })
        })

    })
    //修改
router.post('/edit', (req, res, next) => {
        const { id, name, age, sex } = req.body;
        studentsModel.updateOne({ _id: id }, {
            name,
            age,
            sex
        }, (err) => {
            if (err) throw err;
            res.json({
                status: 0,
                msg: "修改成功"
            })
        })

    })
    //删除
router.post('/delete', (req, res, next) => {
        const { id } = req.body;
        studentsModel.remove({ _id: id }, (err) => {
            if (err) throw err;
            res.json({
                status: 0,
                msg: "删除成功"
            })
        })

    })
    //上传照片
router.post('/upload', upload.any(), (req, res, next) => {
    // console.log(req.body);
    res.json({
        msg: "上传成功"
    })
})
module.exports = router;