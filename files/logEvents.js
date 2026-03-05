// const fs = require('fs');
// //for creating directory
// fs.mkdir("./new",(err) => {
//     if (err) throw err;
//     console.log("directory created")
// })
// const path = require('path')
// fs.readFile(path.join(__dirname,"starter.txt"),(err,data) => {
//     if (err) throw err;
//     console.log(data.toString())
// })
//  console.log(",,,hello")


// fs.writeFile(path.join(__dirname,'reply.txt'),"nice work",(err)=>{
//     if(err) throw err
//     console.log("write complete")
// fs.appendFile(path.join(__dirname,'reply.txt'),"\n\n updating5 ",(err)=>{
//     if(err) throw err
//     console.log("append complete")
// })

// })



// //exit on uncaught errosrs
// process.on("uncaughtException", err => {
//     console.error(`there was an uncaught error : ${err}`)
//      process.exit(1)
// })
const {format}=require("date-fns")
const {v4:uuid} = require("uuid")
console.log(format(new Date(), 'yyyymmdd\tHH:mm:ss'))
console.log(uuid())
const fs = require("fs")
const fsPromises = require("fs").promises;
const path = require('path')
const logEvents = async(message) => {
    const dateTime = `${format(new  Date(),'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message} \n`
    console.log(logItem)
    try{
        
        await fsPromises.appendFile(path.join(__dirname,'new','eventLog.txt'),logItem)
    } catch (err) {
        console.log(err)
    }
}
module.exports =logEvents