const express = require('express')
const router = express.Router() //interms of app
const path = require('path')
const data = {}//first its empty object
data.employees = require("../../data/employees.json")//like connecting to the data base

router.route("/")
      .get((req, res)=>{
        res.json(data.employees)
      })
      .post((req,res)=>{
        
      })

module.exports = router;
