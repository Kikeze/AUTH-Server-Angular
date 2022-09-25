const { request, response } = require("express");
const { validationResult } = require("express-validator");


const ValidarCampos = (req = request, res = response, next) => {
    const result = validationResult( req );

    if( !result.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            msg: "Imposible realizar la operacion solicitada",
            errors: result.mapped()
        });
    }

    next();
};


module.exports = {
    ValidarCampos
};
