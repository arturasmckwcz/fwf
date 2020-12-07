const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const middlewares = require('./middlewares');

const apiRouter = require('./api/api')


const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "FWF"
    });
});
app.use('/api', apiRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;