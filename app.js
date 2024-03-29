import express from 'express';
import mongoose from 'mongoose';
// import {config} from '../config/config.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import favicon from 'serve-favicon';
import path from 'path';

const __dirname = path.resolve();
const app = express();

import routes from './routes/index.js';

app.use(passport.initialize());
app.use(passport.session());

// require('../config/passport')(passport);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// const {port, mongoUri} = require('../config/config.js');

const port = 5000;
const mongoUri = 'mongodb+srv://mikhail:FXMyt2Aq52zf9qP@cluster0-v5uip.azure.mongodb.net/test?retryWrites=true&w=majority';

app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


const startApp = async() => {
    try {
        const mongoConnectionOptions = {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        await mongoose.connect(mongoUri, mongoConnectionOptions, () => {
            mongoose.set('debug', true);
            console.info(`MongoDB connected`);
        });
        await app.listen(port, () => {
            console.info(`Express-server started on port № ${port}`);
        });
    } catch (e) {
        throw new Error(e);
    }
};

startApp();

export default app;
