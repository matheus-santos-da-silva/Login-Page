const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { engine } = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

// Routes Import
const authRouter = require('./routes/authRoutes');
const logoutRouter = require('./routes/logoutRoute');


/* connection with database */
const conn = require('./db/conn');


/* config environment variables */
dotenv.config();


/* handlebars middleware */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


/* bodyParser config */
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());


/* static files config */
app.use(express.static('public'));


/* setup express-session  */
app.use(
    session({
        name: 'session',
        secret: `${process.env.SESSIONSECRET}`,
        resave: false,
        saveUninitialized: true,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            httpOnly: true,
        }
    })
);


/* flash messages */
app.use(flash());


/* set session to res */
app.use((req, res, next) => {

    if(req.session.userid) {
        res.locals.session = req.session;
    }

    next();

})


/* Auth routes */
app.use('/auth', authRouter );

/* Logout route */
app.use('/', logoutRouter );

/* Home route */
app.get('/', (req, res) => {
    res.status(200);
    res.render('others/home');
})


/* server */
conn
    .sync()
    .then(() => {
        const port = process.env.PORT;
        app.listen(port);
        console.log('Success. Server running');
    })
    .catch(error => console.log(error));
