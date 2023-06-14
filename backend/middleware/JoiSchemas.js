const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);
module.exports = {
    quotes: {
        add: Joi.object().keys({
            text: Joi.string().required(),
            author: Joi.string().required()
        })

    }

}