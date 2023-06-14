let AppError = require('./AppError');
module.exports = class NotFoundError extends AppError {
    constructor(_message) {
        const message = _message || 'Route Not Found';
        const status = 404;
        super(message, status);
        this.name = "NotFoundError";
    }
};