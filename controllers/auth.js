const { request, response } = require("express");


const crearUsuario = (req = request, res = response) => {
    console.log(req.body);

    return res.json({
        ok: true,
        msg: "Crear usuario /new"
    });
};

const loginUsuario = (req = request, res = response) => {
    
    console.log(req.body);
    
    return res.json({
        ok: true,
        msg: "Login de usuario /"
    });
};

const renovarToken = (req = request, res = response) => {
    console.log(req.headers);
    
    return res.json({
        ok: true,
        msg: "Renovacion de token /renew"
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}

