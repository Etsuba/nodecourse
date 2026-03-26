// const data = {}//first its empty object
// data.employees = require("../model/employees.json")//like connecting to the data base

const data ={
    employees: require('../model/employees.json'),
    setEmployees: function (data) {this.employees = data}
}

const getAllEmployees =(req, res)=>{
        res.json(data.employees)
      }

const createNewEmployee  = (req,res)=>{
        // res.json(
        //     {
        //         "firstname":req.body.firstname,
        //         "lastname":req.body.lastname
        //     }
        // )

        const newEmployee = {
            id: data.employees[data.employees.length -1].id + 1 || 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname

        }

        if (!newEmployee.first || ! newEmployee.lastname) {
            return res.status(400).json({'message': 'First and last names are required.'})
        }

        data.setEmployees ([...data.employees,newEmployee])


      }

const updateEmployee = (req,res) =>{
        res.json(
            {
                "firstname":req.body.firstname,
                "lastname":req.body.lastname
            }
        )
      }
    

const deleteEmployee = (req,res)=>{
        res.json({"id":req.body.id})
      }

const getEmployee = (req,res)=>{
                res.json({"id": req.params.id})
             }


module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
