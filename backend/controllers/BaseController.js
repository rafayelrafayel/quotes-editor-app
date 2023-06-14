class BaseController {
    params(req) {
        return Object.assign({}, req.params, req.body, req.query);
    }

    _return(res, data = []) {
        res.json({
            message: 'Success',
            code: 200,
            payload: data,
        });
    }

}


module.exports = BaseController;