const express = require('express');
const router = express.Router();
const data = require('../data.json');

// routes
router.get('/', (req, res) => {
  res.render('index', { 'data': data });
});

router.get('/about', (req, res) => {
  res.render('about', data.projects);
});

router.get('/project/:id', (req, res, next) => {
  let projectId = -1;
  try {
    projectId = parseInt(req.params.id);
    if (projectId >= 0 & projectId < data.projects.length) {
      res.render('project', { data: data.projects[projectId] });
    } else {
      res.redirect('/projectNotFound');
    }
  } catch (error) {
    res.redirect('/projectNotFound');
  }
});
router.get('/projects/:id', (req, res) => {
  res.redirect(`/project/${req.params.id}`);
});

module.exports = router;