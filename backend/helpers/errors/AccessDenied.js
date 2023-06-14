let AppError = require('./AppError');
module.exports = class AccessDenied extends AppError {
    constructor(_message = 'Access Denied', _status = 403) {
        const message = _message;
        const status = _status;
        super(message, status);
        this.name = "AccessDeniedError";
    }
};