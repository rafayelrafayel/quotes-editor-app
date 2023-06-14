let AppError = require('./AppError');
module.exports = class ConflictError extends AppError {
    constructor(_message) {
        const message = _message || 'Duplicate resource or Resource already exists';
        const status = 409;
        super(message, status);
        this.name = "ConflictError";
    }
};