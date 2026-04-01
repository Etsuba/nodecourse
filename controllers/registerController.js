const usersDB = {
    users:require('../model/user.json'),//like use state in react
    setusers: function (data){
        this.users = data
    }

}

const fsPromises = require('fs').promises;
const path = require("path")
const bcrypt = require("bcrypt")

const handleNewUser = async (req,res) =>{
    const {user,pwd} = req.body
    if (!user || !pwd) return res.status(400).json({'message':"username and password are required"})

    //check for duplicate user name in db

    const duplicate = usersDB.users.find(person => person.username === user)
    if(duplicate) return res.sendStatus(409);//conflict

    try {
      //encrypt the passs




    } catch (err){
        res.status(500).json({'message':err.message})
    }

}



