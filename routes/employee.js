const express = require("express")
const employeeModel = require('../models/Employee')
const Employee = require("../models/Employee")

const routes = express.Router()

//User can get all employee list
//http://localhost:3001/api/v1/emp/employees
routes.get("/employees", async (req, res) => {

    try {
        const employeeList = await employeeModel.find({})
        res.status(200).send(employeeList)
    } catch(error){
        res.status(500).send(employeeList)
    }

    //res.send({message: "Get All Employee"})
})

//User can create new employee
//http://localhost:3001/api/v1/emp/employees
routes.post("/employees", async (req, res) => {
    console.log(req.body)
    try{
        const newEmployee = new employeeModel({
            ...req.body
        })
        await newEmployee.save()
        //EmployeeModel.create({})
        res.status(200).send(newEmployee)
    }catch(error){
        res.status(500).send(error)
    }
   
    //res.send({message: "Add NEW Employee"})
})

//User can get employee details by employee id
//http://localhost:3001/api/v1/emp/employees/{eid}
routes.get('/employees/:employeeid', async (req, res) => {
    const employeeId = req.params.employeeid;
  
    try {
      // Use Mongoose to find the employee by their ID
      const employee = await Employee.findById(employeeId);
  
      if (employee) {
        res.status(200).json({ message: 'Employee retrieved successfully', data: employee });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

//User can update employee details
//http://localhost:3001/api/v1/emp/employees/{eid}
routes.put('/employees/:employeeid', async (req, res) => {
    const employeeId = req.params.employeeid;
    const updatedData = req.body;
  
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedData, { new: true });
  
      if (updatedEmployee) {
        res.status(200).json({ message: 'Employee updated successfully', data: updatedEmployee });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

//User can delete employee by employee id
//http://localhost:3001/api/v1/emp/employees/{eid}
routes.delete("/employees/:employeeid", async (req, res) => {
    try{
        const employee = await employeeModel.deleteOne({ _id : req.params.employeeid })
        //const employee = await EmployeeModel.findOneAndDelete(req.params.employeeid)
        if(!employee){
            res.status(200).send({message: "Employee Not found"})
        }else{
            res.status(200).send(employee)
        }
    } catch(error){
        res.status(500).send(error)
    }
})

module.exports = routes