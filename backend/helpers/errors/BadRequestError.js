let AppError = require('./AppError');
module.exports = class BadRequestError extends AppError {
    constructor(_message = 'Bad Request', _status = 400) {
        const message = _message
        const status = _status;
        super(message, status);
        this.name = "BadRequestError";
    }
};