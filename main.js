const express = require('express');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://BENR0076:QWE123@cluster30.chmmxsq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const user = await client.db("benr2423").
      collection("users").
      insertOne({
        "username": "admin",
        "password": "password",
        "role": "admin"
      })
    console.log(user);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const app = express()
const port = 5000
//Database of users
let dbUsers = [
  {
    username: "aliff08",
    password: "0987654321",
    name: "aliffaizat",
    email: "alifjr763@gmail.com"
  },
  {
    username: "syed",
    password: "123456789",
    name: "syed ahmad",
    email: "syed@yahoo.com"
  },
  {
    username: "mrpotato",
    password: "123456",
    name: "kimi",
    email: "kimi@garena.com"
  }
]
let dbVisitors = [
  {
    visitorname: "John Placebo",
    visitorpass: "john123",
    id: "A123456",
    phoneNumber: "020202067543",
    email: "johnplacebo@example.com",
    appointmentDate: "2023-06-21",
    carPlate: "JLB4102",
    purpose: "Meeting"
  },
  {
    visitorname: "Jenny Kim",
    visitorpass: "Jenny123",
    id: "090909048454",
    phoneNumber: "0987654321",
    email: "jenniebp@example.com",
    appointmentDate: "2023-06-22",
    carPlate: "XYZ987",
    purpose: "Event"
  },
  // Add more visitors as needed
];

app.use(express.json());

app.post('/login', (req, res) => {
  let data = req.body
  // res.send(' Post request '+ JSON.stringify(data));
  //res.send(' Post request '+ data.name +data.password)
  let user = login(data.username, data.password);

  res.send(generateToken(user))
});

app.post('/register', verifyToken, (req, res) => {
  if (req.user.role == 'admin') {
    let data = req.body
    res.send(
      register(
        data.username,
        data.password,
        data.name,
        data.email
      )
    )
  }
})


app.post('/addvisitors', verifyToken, (req, res) => {
  if (req.user.role == 'user') {
    let data = req.body
    res.send(
      addvisitor(
        data.visitorname,
        data.id,
        data.visitorpass,
        data.phoneNumber,
        data.email,
        data.appointmentDate,
        data.carPlate,
        data.purpose
      )
    )
  }
})

app.get('/visitorinfo', verifyToken, async (req, res) => {
  if (req.user.role == 'admin' || req.user.role == 'security') {
    // find all visitor
    const visitors = await client.db("benr2423").
      collection("visitors").
      find()
      res.send(visitors);
  }

  if(req.user.role == 'user') {
  const visitors = await client.db("benr2423")
    collection("visitors").
    find({ email: req.user.email })
    res.send(visitors);
  }
})

function login(loginuser, loginpassword) {
  console.log("Someone is logging in!", loginuser, loginpassword) //Display message to ensure function is called
  //Verify username is in the database
  const user = dbUsers.find(user => user.username == loginuser && user.password == loginpassword);
  if (user) {
    return (user);
  } else {
    return ({ error: "User not found" });
  }
}


function register(newusername, newpassword, newname, newemail) {
  //verify if username is already in databse
  let match = dbUsers.find(element =>
    element.username == newusername
  )
  if (match) {
    return ("Error! username is already taken :D")
  } else {
    // add info into database
    dbUsers.push({
      username: newusername,
      password: newpassword,
      name: newname,
      email: newemail
    })
    return ("Registration successful! :D")
  }
}
function addvisitor(name, id, visitorpass, phoneNumber, email, appointmentDate, carPlate, purpose) {
  // Add visitor to the database
  dbVisitors.push({
    visitorname:name,
    passnumber:visitorpass,
    idnumber:id,
    phone:phoneNumber,
    email:email,
    date:appointmentDate,
    car:carPlate,
    reason:purpose
  });

  return ("Visitor Registration successful! :D")
}

// To generate JWT Token
function generateToken(userProfile) {
  return jwt.sign(
    userProfile,
    'my_super_secret_password_that_hack_taktau',
    { expiresIn: 60 * 60 });
}

// To verify JWT Token
function verifyToken(req, res, next) {
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'my_super_secret_password_that_hack_taktau', function (err, decoded) {
    if (err) {
      res.send("Invalid Token")
    }

    req.user = decoded
    next()
  });
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})