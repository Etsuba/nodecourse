const usersDB = {
    users:require('../model/user.json'),//like use state in react
    setusers: function (data){
        this.users = data
    }

}

const fsPromises = require('fs').promises;
const path = require("path")
 