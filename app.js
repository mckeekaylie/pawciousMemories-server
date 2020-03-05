require('dotenv').config();

//express
const express = require('express');
const app = express();
const router = express.Router();

//controllers
const user = require('./controllers/usercontroller');
const log = require('./controllers/logcontroller');

//db import & sync
const sequelize = require('./db');
sequelize.sync();
app.use(express.json());

//middleware
app.use(require('./middleware/headers'));

//routes
app.use('/user', user);
app.use(require('./middleware/validatesession'));
app.use('/log', log);

app.listen(process.env.PORT, () => console.log(`app is listening ${process.env.PORT}`));

module.exports = router;
