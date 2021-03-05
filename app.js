const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static',express.static('public'));

app.set('view engine', 'pug');

app.use((req, res, next) => {
  const profile = require('./profile.json');
  app.locals.profile = profile;
  next();
});

const mainRoutes = require('./routes');


app.use(mainRoutes);


app.use('*',(req, res, next) => {
    const err = new Error('Bummer, the page is gone, can\'t be found. Just up and left!!');
    err.status = 404;
    next(err);
  })
  
  app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.error(err);
    if (err.status == 404) {
      res.render('page-not-found');
    } else {
      res.render('error');
    }
  })

  app.listen(3000, () => {
    console.log('The application is running on port: 30000');
})



