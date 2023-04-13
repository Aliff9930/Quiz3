const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');


app.get('/hello', (req, res) => {
  res.send('Saya Hazim Fahmi!')
})

app.get('/hai', (req, res) => {
    res.send('Assalamualaikum!')
})

app.post('/reg', (req, res) => {
    res.send('Walaikumussalam!')
})

app.use(express.json())
// app.post('/login', (req, res) => {
//     console.log (req.body)

//     res.send('login')
// })

app.post('/register',(req,res)=> {
  let result = register(
    req.body.username,
    req.body.password,
    req.body.name,
    req.body.email
  )
  res.send(result)
  })


  // app.post('/login',(req,res)=> {
  //   let result = login(
  //     req.body.username,
  //     req.body.password,
  //   )
  //   res.send(result)
  //   })

    function login(requsername,reqpassword){
      let matchUser= dbUsers.find(
       x => x.username == requsername
        )
    
    if(!matchUser)return"User not found!"
    if(matchUser.password == reqpassword){
      return matchUser
    
    }else{
      return "Invalid Password"
    }
    
    }
    
    function register(reqUsername, reqPassword, reqName, reqEmail) {
      dbUsers.push({
          username: reqUsername,
          password: reqPassword,
          name: reqName,
          email: reqEmail
      })
  }


app.post('/login',(req,res)=> {
    let result = login(
      req.body.username,
      req.body.password,
    )
    // res.send(result)

    let token = generateToken(result)
    res.send(token)

    })
function generateToken(userData){
      const token =jwt.sign(
        userData,
        'inipassword',
        {expiresIn:60}
      );
      return token
    }

   
   
function verifyToken(req,res,next){
  let header =req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token,'inipassword',function(err,decoded)
  {
    if(err){
      res.send("Invalid token")
    }

    req.user = decoded
    next()

  });
}
  
app.get('/bye',verifyToken,(req,res)=>
{
  res.send(('bye bye'))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbUsers =[
  {
      username:"John Wick",
      password:"123456",
      name:"Wickwick",
      email:"a@gmail.com",
  },
]
