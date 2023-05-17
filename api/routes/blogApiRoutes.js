const express = require('express');
const router = express.Router();

const postApiController = require('../controllers/postApiController');


router.get('/', postApiController.main);

router.get('/add', (req, res) => {res.render('blogViews/addPost')});

router.post('/add', postApiController.create);

router.get('/:id', postApiController.post);

router.get('/edit/:id', postApiController.editForm);
router.post('/edit/:id', postApiController.update);

router.get('/delete/:id', postApiController.delete);

module.exports = router;
