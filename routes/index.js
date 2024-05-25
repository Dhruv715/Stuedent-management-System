var express = require('express');
const { view_student } = require('../controller/student');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/paginate/:page_no',view_student)



module.exports = router;
