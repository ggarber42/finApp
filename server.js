const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');
const _ = require('lodash');

let {mongoose} = require('./db/mongoose');
let {Test} = require('./models/test');
let {Gasto} = require('./models/gasto');
let {ObjectID} = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getDate', () => new Date());

app.set('view engine','hbs');

app.get('/', (req,res)=> {
    // Test.find((err, test) => {
    //     if (err) throw err;
    //     res.render('home.hbs', {test});
    //   });
    Gasto.find((err, gasto) => {
        if (err) throw err;
        res.render('home.hbs', {gasto});
      });
})

app.get('/json', (req, res) => {
    Gasto.find((err,gasto) => {
        if(err) throw err;
        res.status(200).send({gasto});
    });
});

app.post('/save', (req,res) => {
    // let test = new Test({
    //     text: req.body.text 
    // });
    // test.save().then((doc) => {
    //     // res.send(doc);
    //     res.redirect('/');
    // }, (err) => {
    //     res.status(400).send(err);
    // })
    let gasto = new Gasto({
        valor: req.body.valor,
        mes: req.body.mes,
        categoria: req.body.categoria,
        observacao: req.body.observacao
    });
    gasto.save().then((doc) => {
        // res.send(doc);
        res.redirect('/');
    }, (err) => {
        res.status(400).send(err);
    })
    // console.log(req.body.text);
});

app.post('/update/:id', (req,res) => {
    var id = req.params.id;
    // var body = _.pick(req.body ,['valor','mes','categoria','observacao']);  
    console.log(id);
    console.log(req.body);
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    } 
    Gasto.findByIdAndUpdate(id, {$set: req.body}, {new: true}).then((gasto) => {
        if(!gasto) {
            return res.status(404).send();
        }
        res.redirect('/');
    }).catch((e) => res.status(400).send())
    
});

app.get('/delete/:id', (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) return;
    Gasto.findByIdAndRemove(id).then((gasto) => {
        if(!gasto){
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