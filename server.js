const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Test} = require('./models/test.js')

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getDate', () => new Date());

app.set('view engine','hbs');

app.get('/', (req,res)=> {
       res.render('home.hbs');
})

app.post('/save', (req,res) => {
    // let test = new Test({
    //     text: 
    // });
    console.log(req.body.text);
    res.send();
});

app.listen(port, () => {
    console.log('Server is upp');
    console.log(`port ${port}`);
});