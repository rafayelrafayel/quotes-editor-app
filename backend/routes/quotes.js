const express = require('express');
const router = express.Router();
const QuotesController = require('../controllers/QuotesController');
const joiMid = require('../middleware/JoiMid');
const schemas = require('../middleware/JoiSchemas');


router.get('/all', async (req, res, next) => {
    await QuotesController.all(req, res, next);
});

router.post('/add', joiMid.req(schemas.quotes.add), async (req, res, next) => {
    await QuotesController.save(req, res, next);
});

router.put('/save/:id', async (req, res, next) => {
    await QuotesController.save(req, res, next);
});

router.delete('/remove/:id', async (req, res, next) => {
    await QuotesController.remove(req, res, next);
});



module.exports = router;