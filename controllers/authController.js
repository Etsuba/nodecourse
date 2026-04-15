const usersDB = {
    users: require('../model/users.json'),//like use state in react
    setUsers: function (data){
        this.users = data
    }

}

const bcrypt = require("bcrypt")
require('dotenv').config()
const fsPromises =require('fs').promises
const path = require('path')
const jwt = require('jsonwebtoken')

const handleLogin = async (req,res) =>{
    const {user,pwd} = req.body
    if (!user || !pwd) return res.status(400).json({'message':"username and password are required"})

        const foundUser = usersDB.users.find(person => person.username === user)
        if(foundUser) return res.sendStatus(401);//unauthorized

        //evaluate password 
         const match = await bcrypt.compare(pwd,foundUser.password)
         if (match) {
                 // create jwt,
                 const accessToken = jwt.sign(
                    {"username": foundUser.username},
                    process.env.ACCESS_TOKE_SECRET,
                    {expiresIn: '30s'}
                 )
                 const refreshToken = jwt.sign(
                    {"username": foundUser.username},
                    process.env.REFRESH_TOKE_SECRET,
                    {expiresIn: '1d'}
                 )

                 // to conect it to db so wjen someone logs out it will erase or invalidate the refresh token

                 const otherUser = usersDB.users.filter( person=> person.username !== foundUser.username)
                 const currentUser = {...foundUser , refreshToken}
                 usersDB.setUsers
            res.json("success" `user ${user} is logged in`)
         }else {
            res.sendStatus(401)
         }

        }

module.exports = {handleLogin}
