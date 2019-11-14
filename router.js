var fs = require('fs');
var express = require('express');
var router = express.Router();
var Student = require('./student');

router.get('/students', function (req, res) {
    // fs.readFile('db.json','utf8',function(err,data){
    //     if(err){
    //         return res.status(500).send('Server error');
    //     }
    //     var students = JSON.parse(data).students; //通过文件读取的数据为字符串，要先转化为对象
    //     res.render('index.html',{
    //         fruit:[
    //             '苹果',
    //             '香蕉',
    //             '句子',
    //             '是你豪哥',
    //             'hg'
    //         ],
    //         students:students
    //     });
    // });


    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.render('index.html', {
            fruit: [
                '苹果',
                '句子',
                '是你豪哥',
                'hg'
            ],
            students: students
        });
    });
});


router.get('/students/new', function (req, res) {
    res.render('new.html');
});


router.post('/students/new', function (req, res) {
    // 1、获取表单数据
    // 2、处理,将数据保存到db,json中
    // 3、发送响应
    new Student(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('/students');
    })
});


router.get('/students/edit', function (req, res) {
    Student.findById(req.query.id.replace(/"/g,''), function (err, student) {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }

        res.render('edit.html', {
            student: student
        })
    })
});


router.post('/students/edit', function (req, res) {
    Student.findByIdAndUpdate(req.body.id.replace(/"/g,''),req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error');
        }

        res.redirect('/students');
    })
});


router.get('/students/delete', function (req, res) {
    Student.findByIdAndRemove(req.query.id.replace(/"/g,''), function (err) {
        if (err) {
            return res.status(500).send('Server err');
        }

        res.redirect('/students');
    })
});
 


module.exports = router;