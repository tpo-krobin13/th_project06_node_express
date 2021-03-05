const express = require('express');
const router = express.Router();
const data = require('../data.json');

// routes
router.get('/', tryWrapper((req, res) => {
  res.render('index', { 'data': data });
}));

router.get('/about', tryWrapper((req, res) => {
  res.render('about', data.projects);
}));


router.get('/project/:id', tryWrapper( (req, res, next) => {
  let projectId = -1;
    projectId = parseInt(req.params.id);
    if (projectId >= 0 & projectId < data.projects.length) {
      res.render('project', { data: data.projects[projectId] });
    } else {
      res.redirect('/projectNotFound');
    }
}));

router.get('/projects/:id', tryWrapper((req, res) => {
  res.redirect(`/project/${req.params.id}`);
}));

router.use('/err', tryWrapper((req, res, next) => {
  let param = callUnknownfunction();
  res.render('throwErrorTemplate');
}))

// DRY says only write it once vs wrapping all of them in try catches. 
// a function to wrap all the code in try catch to pick up any errors thrown by templates etc
function tryWrapper (routeCode) {
  return async (req, res, next) => {
    try{
      routeCode(req, res, next);
    } catch(err) {
      const newErr = new Error('That server blowed up real good!! We got problems boss.', err);
      newErr.status = 500;
      next(newErr);
    }
  };
}

module.exports = router;