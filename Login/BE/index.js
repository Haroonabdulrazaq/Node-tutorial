const express = require('express');
const mongoose  = require('mongoose');
const bodyParser  = require('body-parser');
const passport  = require('passport');
const passportLocal  = require('passport-local').Strategy;
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors')