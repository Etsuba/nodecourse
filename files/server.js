const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(express.static(path.join(__dirname,'..','/public')))
app.get('/',(req,res)=>{
    // res.sendFile(path.join(__dirname,"..","./views/index.html"))
    res.sendFile(path.join(__dirname,"..","./views/index.html"))
})



app.get('/new-page.html',(req,res)=>{
    // res.sendFile(path.join(__dirname,"..","./views/index.html"))
    res.sendFile(path.join(__dirname,"..","./views/new-page.html"))
})

app.get('/old-page.html',(req,res)=>{
    // res.sendFile(path.join(__dirname,"..","./views/index.html"))
    res.redirect(301,'/new-page.html')
})

app.get('/hello.html',(req,res,next)=>{
    console.log('attempted to load hello.html')
    next()
},(req,res) =>{
    res.send("hello world")
})

const one = (req, res, next)=>{
    console.log('one')
    next()
}


const two = (req, res, next)=>{
    console.log('two')
    res.send('finished')
}

app.get('/chain.html',[one,two])

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});






app.get('/ ')
app




app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})