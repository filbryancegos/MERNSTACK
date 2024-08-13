let Employee = require('../models/employee.model');

// create all employees
const createEmployee = async (req, res) => {
  const {employeeId, firstName, lastName, email, department, position, salary} = req.body;
  const errors = {};

  for (const [key, value] of Object.entries(req.body)) {
    if (value === '') {
      errors[key] = `Please enter an ${key}`
    }
  }

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  if (!isEmpty(errors)) {
    return res.status(400).json({success: false, errors})
  }

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({success: false, message: 'Please input a valid email!'})
  }

  try {
    const employee = await Employee.create({employeeId, firstName, lastName, email, department, position, salary})
    const success = {
      success: true,
      message: 'Emloyee successfully added'
    }
    res.status(200).json({...employee._doc, ...success});
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// get all employees
const getEmployees = async (req, res) => {
  const employee = await Employee.find();
  res.status(200).json(employee)
}

// delete employee
const deleteEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  const success = {
    success: true,
    message: 'Emloyee deleted successfully'
  }
  res.status(200).json({...employee._doc, ...success})
}

// update and employee
const updateEmployee = async (req, res) => {
  try {
    // Find the employee by ID
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json('Employee not found');
    }

    // Update employee fields
    employee.employeeId = req.body.employeeId;
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.email = req.body.email;
    employee.department = req.body.department;
    employee.position = req.body.position;
    employee.salary = req.body.salary;

    // Save the updated employee
    await employee.save();

    // Send a success response

    const success = {
      success: true,
      message: 'Emloyee updated successfully'
    }
    res.json({...employee._doc, ...success});
  } catch (err) {
    // Handle any errors
    res.status(400).json('Error: ' + err);
  }
  
}


module.exports = {
  createEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee
}
