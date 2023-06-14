const Quote = require('../models/quotes');

class QuotesController extends require('./BaseController') {

    // Get all quotes
    async all(req, res, next) {

        try {
            const quotes = await Quote.find();
            super._return(res, quotes);
        } catch (error) {
            next(error);
        }



    }
    // Add a new quote
    async save(req, res, next) {
        try {
            const { id } = req.params;
            const { text, author } = req.body;
            let quote;
            if (!id) {
                quote = new Quote({ text, author });
                await quote.save();
            } else {
                quote = await Quote.findByIdAndUpdate(
                    id,
                    { text, author },
                    { new: true }
                );
            }

            super._return(res, quote);
        } catch (error) {
            next(error);
        }


    }

    // Delete a quote
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            await Quote.findByIdAndDelete(id);
            super._return(res);
        } catch (error) {
            next(error);
        }


    }

};

module.exports = new QuotesController();