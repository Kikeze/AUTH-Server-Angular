const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, loginUsuario, renovarToken } = require("../controllers/auth");
const { ValidarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


router.post("/new", [
    check("nombre")
        .notEmpty().withMessage("Debe especificar la nombre"),
    check("email")
        .notEmpty().withMessage("Debe especificar el EMail")
        .isEmail().withMessage("El valor especificado no es un EMail"),
    check("password")
        .notEmpty().withMessage("Debe especificar la contraseña")
        .isLength({min:6}).withMessage("La contraseña debe ser de 6 o mas caracteres"),
    ValidarCampos
], crearUsuario);

router.post("/", [
    check("email")
        .notEmpty().withMessage("Debe especificar el EMail")
        .isEmail().withMessage("El valor especificado no es un EMail"),
    check("password")
        .notEmpty().withMessage("Debe especificar la contraseña")
        .isLength({min:6}).withMessage("La contraseña debe ser de 6 o mas caracteres"),
    ValidarCampos
], loginUsuario);

router.get("/renew", [
    validarJWT
], renovarToken);


module.exports = router;
