let dbUsers =[
    {
        username:"John Wick",
        password:"123456",
        name:"Wickwick",
        email:"a@gmail.com",
    },
{
    username:"abuja",
    password:"098765",
    name:"Mr Abuja",
    email:"abuja@gmail.com",
},

{
    username:"niger",
    password:"098765",
    name:"Mr niger",
    email:"nnnn@gmail.com",
}
]


function login(requsername,reqpassword){
   let matchUser= dbUsers.find(
    user => user.username == requsername
     )
     console.log(matchUser)
}


// function login(requsername,reqpassword){
//     let matchUser= dbUsers.find(
//      x => x.username == requsername
//       )

// if(!matchUser)return"User not found!"
// if(matchUser.password == reqpassword){
//     return matchUser

// }else{
//     return "Invalid Password"
// }

// }

function register(username,password,name,email){
    dbUsers.push({
        username : username,
        password : password,
        name : name,
        email : email
    })
}
// try login

// console.log (login("niger","098765"))
// console.log (login("abuja","098765"))
// console.log (login("utem","098765"))
// console.log (login("abuja","111111"))

register("utem","password","fkekk","fkekk@gmail.com")
console.log (login("utem","password"))