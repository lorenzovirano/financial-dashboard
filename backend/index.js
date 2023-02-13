
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const cors = require("cors")
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const {unless} = require('express-unless');
const Bank = require('./models/bank.model');

const app = express();

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
app.use('/bank', require("./routes/banks.routes"));
app.use(errors.errorHandler);

app.listen(process.env.port || 4000, function () {
    console.log("Pronti");
})