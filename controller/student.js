const result = require('../model/result');
const Student = require('../model/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.AddStudent = async (req,res) => {
    try {
        const existingStudent = await Student.findOne({ email: req.body.email });
        if (existingStudent) {
            throw new Error("Email already registered");
        }
         req.body.image = req.file.originalname
         req.body.password = await bcrypt.hash(req.body.password, 12)

         let data = await Student.create(req.body)
         res.status(200).json({
            status : 'success',
            message:'signup successfull',
            data
        })
    } catch (error) {
        res.status(401).json({
            status : 'Failed',
            message:error.message
        })
    }
}

// Student Login
exports.StudentLogin = async (req,res) =>{
    try {
        const SelectEmail = await Student.find({email : req.body.email})
        
        if(!SelectEmail) {
            throw new Error("user not exist")
        }

        let SelectPass = await bcrypt.compare(req.body.password, SelectEmail[0].password)
        if(!SelectPass) {
            throw new Error ("incorrect Password")
        }
        else{
            var token = await jwt.sign(SelectEmail[0].id,'token')
            res.status(200).json({
                status : "success",
                message : "login successfull",
                token
            })
        }
    
    } catch (error) {
        res.status(401).json({
            status : 'Failed',
            message:error.message
        })
    }
}


// Search Student Data 
exports.FetchStudent = async(req,res)=>{
    try {
        const id = req.params.id;
        const Data= await Student.findById(id);
        res.status(200).json({
            status :'Success',
            message : 'Data Fetching Successfully',
            Data
        })
    } catch (error) {
        res.status(401).json({
            status:'Failed',
            message : 'Error Occured',
            error
        })
    }
}


exports.DelAllStudent = async (req,res)=>{
    try {
        // var id  = req.params.id;
        // var id  = req.params.id;
        // var data  = await Product.deleteMany({_id : id});
        var data  = await Student.deleteMany();
        res.status(200).json({
            status:'Success',
            message:'Student Deleted SuccessFully'
        })
    } catch (error) {
            res.status(401).json({
                status:'Failed',
                message:'Error Occured',
                error
            })
    }
}

exports.DelStudent = async (req,res)=>{
    try {
        // var id  = req.params.id;
        var id  = req.params.id;
        var data  = await Student.deleteOne({_id : id});
        // var data  = await Student.deleteMany();
        res.status(200).json({
            status:'Success',
            message:'Student Deleted SuccessFully'
        })
    } catch (error) {
            res.status(401).json({
                status:'Failed',
                message:'Error Occured',
                error
            })
    }
}


exports.UpdateStudent =  async (req,res) =>{
    try {
        const id= req.params.id;
        const Update =req.body;
        req.body.image = req.file.originalname;
        req.body.password = await bcrypt.hash(req.body.password, 12)
        const Data = await Student.findByIdAndUpdate(id,Update);
        res.status(200).json({
            status:'Success',
            message: 'Student Update Successfully',
            Data
        })

    } catch (error) {
            res.status(401).json({
                status : 'Failed',
                message : 'Error Occured',
                error
            })
    }
}

// View Result
exports.view_result = async (req,res) => {
    try {
        const token = req.headers.auth;
        if (!token) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Authorization token not provided',
            });
        }
        const decoded = jwt.verify(token, 'token'); 
        console.log(decoded)
        const studentId = decoded.id;

        const data = await result.find({ student_id: studentId }).populate('student_id'); 
        res.status(200).json({
            status:'Success',
            message: 'Data Fetch Successfully',
            data
        })
    } catch (error) {
        res.status(401).json({
            status : 'Failed',
            message : 'Error Occured',
            error
        })
    }

}


// Top 5 Student Details
exports.top_five = async (req, res) => {
    try {
        const data = await result.find()
            .sort({ total: -1 }) // Sort by total in descending order
            .limit(5)
            .populate('student_id'); // Populate student details
        
        res.status(200).json({
            status: 'success',
            message: 'Top 5 students fetched successfully',
            data
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'An error occurred while fetching top 5 students',
            error: error.message
        });
    }
};



// Pagination Concept
exports.view_student = async (req,res) => {

    var page_no = req.params.page_no
    var limit = 2
    var skip = (page_no-1)*limit

    var data = await Student.find().limit(limit).skip(skip)
    res.send(data)
}