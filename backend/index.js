
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const cors = require("cors")
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const {unless} = require('express-unless');

const app = express();
// app.use(function(req, res, next) {
//     console.log(req.method )
//     if(req.method == "OPTIONS"){
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         res.setHeader('Access-Control-Allow-Headers',' X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization');
        
//         res.setHeader('HTTP/1.1 200 OK')
//         console.log(res)
//     }

//     next();
// });
app.use(cors())
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('Database connected');
    },
    (error) => {
        console.log("Database can't connected: "+ error);
    }
);
auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url : "/users/login", methods: ["POST"]},
            { url : "/users/register", methods: ["POST"]}
        ]
    }) 
)


app.use(express.json());

app.use('/users', require('./routes/users.routes'));
app.use('/transaction', require("./routes/transactions.routes"));
app.use(errors.errorHandler);

app.listen(process.env.port || 4000, function () {
    console.log("Pronti");
})