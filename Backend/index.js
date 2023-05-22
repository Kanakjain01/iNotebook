const connectToMongo = require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 4000

app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})
// nhi rukdekha? kya usne niche se localhost3000 liya thunder m dala then kuch kkyas laala wo usne print kraya h tum normal likh do wo kaam krega y lo isme kaage btao ohk krta haa kro y tum API bna rhe ho pta h haa haa backend kro kro aage kro okhaa

