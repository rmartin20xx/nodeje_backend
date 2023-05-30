var express = require('express')
    routes = require('./routes')
    path = require('path')
    // ejs = require('ejs')
    fileUpload = require('express-fileupload')
    app = express()
    mysql = require('mysql');


//establish database connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwordone',
    database: 'first_db'
});

connection.connect();

global.db = connection;

//all environments

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(fileUpload());
//set views file
app.use(express.static(__dirname + '/public'));

//development only

app.get('/', routes.index); // call for main index page
app.post('/', routes.index); //call for sign post
app.get('/profile/:id', routes.profile);

//Middleware
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
