const Result = require("../model/result");
const Student = require("../model/student");

exports.AddResult = async (req, res) => {
  try {
    const { rollno } = req.body;
    // Find the student by rollno
    const student = await Student.findOne({ rollno });
    if (!student) {
      res.status(404).json({
        status: "Failed",
        message: "Student not found",
        error,
      });
    } else {
      // Ensure only required fields are passed
      const { rollno, subject1, subject2, subject3, subject4, subject5 } =
        req.body;
      const total = subject1 + subject2 + subject3 + subject4 + subject5;
      const per = total / 5;
      if (per >= 90) {
        grade = "A";
      } else if (this.per >= 80) {
        grade = "B";
      } else if (this.per >= 70) {
        grade = "C";
      } else if (this.per >= 60) {
        grade = "D";
      } else {
        grade = "F";
      }

      req.body.total = total;
      req.body.per = per;
      req.body.grade = grade;
      // Create a new result document
      // Save the result, which will trigger the pre-save hook to calculate total, per, and grade
      const Data = await Result.create(req.body);
      //const Data = await newResult.save();
      res.status(200).json({
        status: "Success",
        message: "Data Inserted SuccessFully",
        Data,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Error Occured",
      error,
    });
  }
};

// Delete All Result At at time
exports.DelAllResult = async (req, res) => {
  try {
    var Data = await Result.deleteMany();
    res.status(200).json({
      status: "Success",
      message: "All Result Deleted SuccessFully",
    });
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Error Occured",
      error,
    });
  }
};

// Delete By Id
exports.DelResult = async (req, res) => {
  try {
    // var id  = req.params.id;
    var id = req.params.id;
    var data = await Result.deleteOne({ _id: id });
    // var data  = await Student.deleteMany();
    res.status(200).json({
      status: "Success",
      message: "Result Deleted SuccessFully",
    });
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Error Occured",
      error,
    });
  }
};

// Update Result
exports.UpdateResult = async (req, res) => {
  try {
    const id = req.params.id;
    const { rollno, subject1, subject2, subject3, subject4, subject5 } =
      req.body;
    const total = subject1 + subject2 + subject3 + subject4 + subject5;
    const per = total / 5;
    if (per >= 90) {
      grade = "A";
    } else if (this.per >= 80) {
      grade = "B";
    } else if (this.per >= 70) {
      grade = "C";
    } else if (this.per >= 60) {
      grade = "D";
    } else {
      grade = "F";
    }

    req.body.total = total;
    req.body.per = per;
    req.body.grade = grade;
    const Update = req.body;

    const Data = await Result.findByIdAndUpdate(id, Update);
    res.status(200).json({
      status: "Success",
      message: "Result Update Successfully",
      Data,
    });
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Error Occured",
      error,
    });
  }
};


exports.findResult = async (req, res) => {
  try {
      const { rollno } = req.params; // Extract rollno from req.params directly
      const resultData = await Result.find({ rollno }).populate('student_id');
      if (!resultData.length) {
          return res.status(404).json({
              status: 'Failed',
              message: 'No results found for this roll number',
          });
      }

      res.status(200).json({
          status: 'Success',
          message: 'Result fetched successfully',
          data: resultData, // Ensure you are sending the resultData
      });
  } catch (error) {
      res.status(500).json({
          status: 'Failed',
          message: 'Error occurred',
          error: error.message, // Send the error message
      });
  }
};