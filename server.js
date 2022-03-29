const express = require('express')
const app = express()
const port = process.env.port || 5000
const dbConnection = require('./db')

app.use(express.json())


app.use('/api/bikes/' , require('./routes/bikesRoute'))
app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/bookings/' , require('./routes/bookingsRoute'))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Node Js server started in port ${port}`));