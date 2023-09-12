require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.PORT = process.env.PORT || 3000;

const oEnv = {};

oEnv.dev = {
    BASE_URL: '',
    DB_URL: process.env.DB_URL,
};

oEnv.stag = {
    BASE_URL: '',
    DB_URL: process.env.DB_URL,
};

oEnv.prod = {
    BASE_URL: '',
    DB_URL: process.env.DB_URL,
};

process.env.BASE_URL = oEnv[process.env.NODE_ENV].BASE_URL;
process.env.DB_URL = oEnv[process.env.NODE_ENV].DB_URL;

process.env.JWT_SECRET = process.env.JWT_SECRET;
