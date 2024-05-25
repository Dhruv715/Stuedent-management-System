const { DelAllResult, AddResult, DelResult, UpdateResult, findResult ,top_five} = require("../controller/Result");
var express = require('express');
const { view_result } = require("../controller/student");
var router  = express.Router();

// Add New Result Data
router.post('/AddResult',AddResult);

// Delete All Result At a Time
router.delete('/DelAllResult',DelAllResult);

// Delete Specific Result
router.delete('/DelResult/:id',DelResult);

// Update Result
router.post('/UpdateResult/:id',UpdateResult);


router.get('/view_result',view_result);

// Fetch Result
router.get('/resultData/:rollno',findResult);

module.exports = router;
