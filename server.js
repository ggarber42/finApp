const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Test} = require('./models/test')
let {ObjectID} = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getDate', () => new Date());

app.set('view engine','hbs');

app.get('/', (req,res)=> {
    Test.find((err, test) => {
        if (err) throw err;
        res.render('home.hbs', {test });
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

app.get('/update/:id', (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) {
        res.status(404).send('errou');
    };
    Test.findById(id).then((test) => {
        if(!test){
            res.status(404).send();
        }
        // res.send({todo}).redirect('/');
        res.status(200).send('Ok');
    }, err => {
        res.status(400).send();
    });
});

app.get('/delete/:id', (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) return;
    Test.findByIdAndRemove(id).then((test) => {
        if(!test){
            return res.status(404).send();
        }
        res.redirect('/');
    }, err => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log('Server is up...');
    console.log(`port ${port}`);
});