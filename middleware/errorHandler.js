const errorHandler = (err, req, res, next ) => {
  // if(err.name === "JsonWebTokenError") {
  //   console.log("masuk ke error json");
  // }
  console.log(err, 'ERROR di terima di error handler');
  let code = 500;
  let message = "Internal server error"
  if(err.name === "SequelizeUniqueConstraintError" || err.name === "SequelizeValidationError") {
    code = 400,
    message = err.errors[0].message
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = err.msg
  } else if(err.name === "Unauthorized" ) {
    code = 401;
    message = err.msg
  } else if(err.name === "Bad Request") {
    code = 400;
    message = err.msg
  } else if(err.name === "Not Found") {
    code = 404;
    message = err.msg
  } else if(err.name === "Forbidden") {
    code = 403;
    message = err.msg
  }
  res.status(code).json({message})
}

module.exports = errorHandler