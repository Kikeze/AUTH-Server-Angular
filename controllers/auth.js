const { request, response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");


const crearUsuario = async (req = request, res = response) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificamos que no exista el EMail
        let usuario = await Usuario.findOne({email});

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: "El Email especificado ya ha sido registrado con anterioridad"
            })
        }

        // Referenciar el modelo
        usuario = new Usuario( req.body );

        // Aplicamos el hash a la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario en la DB
        await usuario.save();
        
        // Generamos el token
        const token = await generarJWT(usuario.id, nombre, email);

        // Finaliza
        return res.json({
            ok: true,
            msg: "Usuario creado con exito",
            data: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            },
            token
        });
    }
    catch (error) {
        // Procesa el error
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: "Imposible realizar la operacion solicitada"
        });
    }

};

const loginUsuario = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        // Verificamos si existe el usuario
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario y/o contraseña son incorrectos"
            });
        }

        // Verificamos la contraseña
        const verifica = bcrypt.compareSync(password, usuario.password);

        if( !verifica ) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario y/o contraseña son incorrectos"
            });
        }

        // Generamos el token
        const token = await generarJWT(usuario.id, usuario.nombre, usuario.email);

        // Finaliza
        return res.json({
            ok: true,
            msg: "Usuario autenticado con exito",
            data: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            },
            token
        });
    }
    catch (error) {
        // Procesa el error
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: "Imposible realizar la operacion solicitada"
        });
    }
    
};

const renovarToken = async (req = request, res = response) => {
    const payload = req.tokenPayload;
    
    try {
        // Generamos el nuevo token
        const token = await generarJWT(payload.uid, payload.nombre, payload.email);

        // Finaliza
        return res.json({
            ok: true,
            msg: "Token renovado con exito",
            data: {
                id: payload.uid,
                nombre: payload.nombre,
                email: payload.email
            },
            token
        });
    }
    catch (error) {
        // Procesa el error
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: "Imposible realizar la operacion solicitada"
        });
    }
};


module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
};

