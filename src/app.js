import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { engine } from 'express-handlebars';

import mongoose from './config/database.config.js';
import initializePassport from './config/passport.config.js';
import { __dirname } from './utils.js';

import usersRouter from './routes/api/users.js';
import viewsRouter from './routes/viewsRouters.route.js';
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://leoromero:QOrVKYyuO107QJi7@backend-1.koc7tgh.mongodb.net/?retryWrites=true&w=majority&appName=backend-1' })
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', usersRouter);
app.use('/', viewsRouter);

app.listen(PORT, () => {
    console.log('Servidor http listo');
})
