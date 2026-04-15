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
                 //saving refrshToken with the cirrent user so we can eaasily erse the refresh token if they log out before day 1 ends 
                 const otherUser = usersDB.users.filter( person=> person.username !== foundUser.username)
                 const currentUser = {...foundUser , refreshToken}
                 usersDB.setUsers([...otherUser, currentUser])
                 await fsPromises.writeFile(
                    path.join(__dirname, "..","model","users.json"),
                    JSON.stringify(usersDB.users)

                 )
        
            res.cookie('jwt', refreshToken,{ httpOnly:true ,maxAge:24*60*60*1000})
            res.json("success" `user ${user} is logged in`)
         }else {
            res.sendStatus(401)
         }

        }

module.exports = {handleLogin}
