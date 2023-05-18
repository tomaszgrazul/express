const express = require('express');
const router = express.Router();

const postApiController = require('../controllers/postApiController');


router.get('/', postApiController.main);

router.post('/add', postApiController.create);

router.get('/:id', postApiController.post);

router.put('/edit/:id', postApiController.update);

router.delete('/delete/:id', postApiController.delete);

module.exports = router;
