require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { userRouter } = require('./routes/userRoutes');
const { sequenceRouter } = require('./routes/sequenceRoutes');
const { execRouter } = require('./routes/ExecutionRoutes');


/*----- Global Middlewares---- */
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend's origin
    credentials: true,
}));

/* Routes */
app.use('/api/user', userRouter)
app.use('/api/sequence', sequenceRouter)
app.use('/api/execution', execRouter)

/* Connection */
mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server and Database connected on port 5000 ")
    })
}).catch((error) => { console.log(error) })


