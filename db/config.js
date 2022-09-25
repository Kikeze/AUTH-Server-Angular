const mongoose = require("mongoose");


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DBSERVER, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log("Base de datos conectada");
    }
    catch(error) {
        console.error(error);
        throw new Error("Error de inicializacion de la base de datos");
    }

}


module.exports = {
    dbConnection
};

