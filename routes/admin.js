var express = require('express');
var router  = express.Router();
const { AddAdmin, AdminLogin } = require('../controller/admin');
var multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req,res,cd){
            cd(null , './public/images');
    },
    filename : function (req,file,cd){
        cd(null ,file.originalname);
    }
})

const upload = multer({storage : storage});

// Add New Admin
router.post('/AddAdmin',upload.single('image'),AddAdmin);

// Login Admin
router.post('/Login',AdminLogin);


module.exports = router;
