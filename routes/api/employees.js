const express = require('express')
const router = express.Router() //interms of app
// const data = {}//first its empty object
// data.employees = require("../../data/employees.json")//like connecting to the data base
//we moved the above two code to the employesscontroler file because thats where the logic is to be applied


const { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../../controllers/employeesController');
//chaining each http method together
router.route("/")
      .get(getAllEmployees)
      .post(createNewEmployee)
      .put(updateEmployee)
      .delete(deleteEmployee);

      router.route('/:id')
             .get(getEmployee);

      

module.exports = router;
