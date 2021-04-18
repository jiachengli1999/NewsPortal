const express = require('express');
const News = require('../models/news');
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const news = await News.find({ isSports: true }).sort({ pub_date: -1 });
        res.send(news);
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/', auth, upload.single('photo'), async (req, res) => {
    var img = req.body.img_url;
    if (req.file) {
        img = "http://localhost:3000/images/" + req.file.originalname;
    }else if(img==""){
        img=undefined;
    }

    var auth=req.body.author;
    if(auth==""){
        auth=undefined;
    }

    var date=req.body.pub_date;
    if(date==""){
        date=undefined;
    }


    const newsDao = {
        isSports: true,
        img_url:img,
        title:req.body.title,
        description:req.body.description,
        pub_date:date,
        url:req.body.url,
        author:auth
    };
    try {
        const news = new News(newsDao);
        await news.save();
        res.status(200).redirect('/news/all');
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;