const express = require('express')
const router = express.Router() //interms of app
const data = {}//first its empty object
data.employees = require("../../data/employees.json")//like connecting to the data base

//chaining each http method together
router.route("/")
      .get((req, res)=>{
        res.json(data.employees)
      })
      .post((req,res)=>{
        res.json(
            {
                "firstname":req.body.firstname,
                "lastname":req.body.lastname
            }
        )
      })

      .put  ((req,res) =>{
        res.json(
            {
                "firstname":req.body.firstname,
                "lastname":req.body.lastname
            }
        )
      })

      .delete((req,res)=>{
        res.json({"id":req.body.id})
      });

      router.route('/:id')
             .get((req,res)=>{
                res.json({"id": req.params.id})
             });

      

module.exports = router;
