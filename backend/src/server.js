const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

mongoose.connect(
    'mongodb+srv://adauto:adauto@cluster0-rven8.mongodb.net/omnistack8?retryWrites=true&w=majority',
    {
        useCreateIndex: true,
        useNewUrlParser: true
    }
);

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);