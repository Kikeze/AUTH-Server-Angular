const jwt = require("jsonwebtoken");


const generarJWT = (uid, nombre, email) => {

    const payload = {
        uid,
        nombre,
        email,
        fecha: new Date()
    }

    // console.log(payload);

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {expiresIn: "24h"}, (error, token) => {
            if( error ) {
                reject(error);
            }
            else {
                resolve(token);
            }
        });
    });

};


module.exports = {
    generarJWT
};
