var express = require('express');
const { AddStudent, DeleteProduct, DeleteStudent, DelAllStudent, DelStudent, FetchStudent, UpdateStudent, StudentLogin, top_five } = require('../controller/student');
const { AddResult } = require('../controller/Result');
var router = express.Router();

// multer
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Add New Student With Image
router.post('/AddStudent',upload.single('image'),AddStudent);

// Login Student
router.post('/LoginStudent',StudentLogin);

// Delete All Record at a Time
router.delete('/DelStudent',DelAllStudent);

// Delete Specific Student
router.delete('/DelStudent/:id',DelStudent);

// Fetching Student Data
router.get('/FetchData/:id',FetchStudent);

// Update Student Data
router.post('/UpdateStudent/:id',upload.single('image'),UpdateStudent);

// Show Top Five Student Data
router.get('/topfiveStudent',top_five);

module.exports = router;
