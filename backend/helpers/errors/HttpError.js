let AppError = require('./AppError');
module.exports = class HttpError extends AppError {
    constructor(_message) {
        const message = _message || 'Internal server error';
        const status = 500;
        super(message, status);
        this.name = "HttpError";
    }
};