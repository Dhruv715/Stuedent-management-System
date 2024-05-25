const Admin = require('../model/admin');
const bcrypt = require('bcrypt');

exports.AddAdmin = async (req,res) => {
        try {
            const selectEmail = await Admin.find({email : req.body.email});
            if(selectEmail == 1){
                    throw new Error('email Already Exist');

            }
            else{
                req.body.image = req.file.originalname;
                req.body.password =  await bcrypt.hash(req.body.password,12);
                var Data = await Admin.create(req.body);
                res.status(200).json({
                    status :'Success',
                    message : 'Admin Sigup SuccessFully',
                    Data
                })
            }

        } catch (error) {
            res.status(401).json({
                status : 'Failed',
                message:error.message
            })
        }
}

// Login
exports.AdminLogin = async (req,res) =>{
    try {
        const SelectEmail = await Admin.find({email : req.body.email})
        
        if(!SelectEmail) {
            throw new Error("user not exist")
        }

        let SelectPass = await bcrypt.compare(req.body.password, SelectEmail[0].password)
        if(!SelectPass) {
            throw new Error ("incorrect Password")
        }

        res.status(200).json({
            status : "success",
            message : "login successfull",
            SelectEmail
        })
        
    } catch (error) {
        res.status(401).json({
            status : 'Failed',
            message:error.message
        })
    }
}