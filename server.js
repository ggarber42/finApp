const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Test} = require('./models/test')

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getDate', () => new Date());

app.set('view engine','hbs');

app.get('/', (req,res)=> {
       res.render('home.hbs',{
           arr: [1,2,3]
       });
})

app.post('/save', (req,res) => {
    let test = new Test({
        text: req.body.text
    });
    test.save().then((doc) => {
        // res.send(doc);
        res.redirect('/');
    }, (err) => {
        res.status(400).send(err);
    })
    // console.log(req.body.text);
});

app.listen(port, () => {
    console.log('Server is upp');
    console.log(`port ${port}`);
});