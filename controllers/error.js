const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {

    let error = { ...err };

    error.message = err.message;

    if(err.name == "CastError"){
        const message = `Can't Find Bootcamp with id ${err.value}`
        error = new ErrorResponse(message, 404);
    }

    // MONGO DUPLICATE ERROR HANDLING
    if(err.code === 11000){
        const message = `Duplicate Field Entered!`
        error = new ErrorResponse(message, 400);
    }

    // Mandatory Field Not entered error
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 404).json({
        success : false,
        error : error.message || `Server Error`
    })
}

module.exports = errorHandler;