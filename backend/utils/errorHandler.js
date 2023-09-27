class ErrorHandler{
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
// class ErrorHandler extends Error{
//     constructor(message, statusCode){
//         super(message)
//         this.statusCode = statusCode

//         Error.captureStackTrace(this, this.constructor)
//     }

// }

module.exports = ErrorHandler;
