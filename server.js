const express = require('express');
const https = require('https');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const port = (process.env.PORT) ? process.env.PORT : 8080;
app.set('view engine', 'hbs'); // set our template engine to handlebars
// handlebars will look for any hbs file in views
hbs.registerPartials(__dirname + '/views/partials');
// middleware is how you config your express app
// app.use(express.static(__dirname + '/public'));
hbs.registerHelper('currentYear', () => new Date().getFullYear())
hbs.registerHelper('saySomething', (text) => text.toUpperCase())
// middleware
app.use((req, res, next) => {
    console.log(new Date().toString());
    fs.appendFile('server.log', new Date().toString() + ' ' + req.method + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    })
    next();
})

app.use((req, res, next) => {
    if (req.url === '/about') {
        res.render('maintenance.hbs')
    }
    next();
})

app.get('/', (request, response) => {
    response.render('home.hbs', {
        header: 'Home Header',
        message: 'Hola!',
    });
})
app.get('/about', (requst, response) => {
    // request handler
    response.render('about.hbs', {
        header: 'About Header',
    });
});
app.get('/projects', (req,res)=>{
    res.render('projects.hbs',{
        header: 'projects',
        project: 'some-project'
    })
})
// basic routing
app.get('/bad', (request, response) => {
    response.send({
        statusCode: 404,
        error: 'Bad request'
    })
})

// remember that the order of your requests matter

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});

// development life cycle from idea to live project