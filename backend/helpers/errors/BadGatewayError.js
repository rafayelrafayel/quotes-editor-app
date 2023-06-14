let AppError = require('./AppError');
module.exports = class BadGatewayError extends AppError {
    constructor(_message) {
        const message = _message || 'Bad Gateway';
        const status = 502;
        super(message, status);
        this.name = "BadGatewayError";
    }
};