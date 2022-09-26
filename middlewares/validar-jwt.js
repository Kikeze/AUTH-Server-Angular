const { request, response } = require("express");
const jwt = require("jsonwebtoken");


const validarJWT = (req = request, res = response, next) => {
    const token = req.header("x-wait");

    // Verificamos el token especificado
    if( !token ) {
        return res.status(400).json({
            ok: false,
            msg: "Imposible autenticar al usuario"
        });
    }

    try {
        // Procesa el token
        const payload = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        req.tokenPayload = payload;
    }
    catch (error) {
        // Procesa el error
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: "Imposible realizar la operacion solicitada"
        });
    }

    next();
};


module.exports = {
    validarJWT
};

