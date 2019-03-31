const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getDate', () => new Date());

app.set('view engine','hbs');

app.get('/', (req,res)=> {
       res.render('home.hbs');
})

app.listen(port, () => {
    console.log('Server is upp');
    console.log(`port ${port}`);
});