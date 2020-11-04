const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const cors = require('cors');
const auth = require('./middleware/auth');
const helmet = require('helmet');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/tasks.router');
const loginRouter = require('./resources/login/login.router');
const { winston, morgan } = require('./logging/logging');
const error = require('./middleware/error');

process.on('uncaughtException', err => {
  winston.error(err.message, { err });
});
process.on('unhandledRejection', err => {
  winston.error(err.message, { err });
  throw err;
});

/* Promise.reject(Error('Oops!')); */

const app = express();
app.use(helmet());
app.use(cors());
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(morgan('dev'));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  const { method, url, params, query, body } = req;
  winston.info({ method, url, params, query, body });
  next();
});
app.use('/login', loginRouter);
app.use('/users', auth, userRouter);
app.use('/boards', auth, boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(error);
module.exports = app;
