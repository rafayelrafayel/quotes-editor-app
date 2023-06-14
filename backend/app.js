

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const connectDB = require('./config/db');
connectDB();

//Custom modules
const NotFoundError = require('./helpers/errors/NotFoundError');


const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());






app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));


app.get('/', (req, res, next) => {//Auth,
    res.send('Hello World!')
})

app.use('/api/v1', apiRoutes);

// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(new NotFoundError());
});
//app.use(require('./modules/handleErrors'));
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        code: err.status || 500,
        stack: err.stack,
        err: err
    });
});

module.exports = app;

