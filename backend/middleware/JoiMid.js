const BadRequestError = require('../helpers/errors/BadRequestError');

const options = {
    allowUnknown: true
};

const validate = (obj, property, schema, includeOptions, next) => {
    try {
        let error = schema.validate(obj[property], includeOptions && options).error;

        if (error) {
            const message = error.details.map(i => i.context.label).join(',');
            // const message = error.message;
            throw new BadRequestError(message, 422);
        } else {
            next();
        }
    } catch (error) {
        next(error)
    }
};

const reqMiddleware = (schema, property = 'body', includeOptions = false) => {
    return (req, res, next) => {
        validate(
            req,
            property,
            schema,
            includeOptions,
            next
        )
    }
};



module.exports = {
    req: reqMiddleware
};