const express = require('express')
const app = express()
const port = 3000

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
app.post('/login', (req, res) => {
    console.log (req.body)

    res.send('login')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
