class ApiError extends Error{
    constructor(
        statusCode,
        message = "Somthing Wrong",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.errors = errors
        this.message = message
        this.success = false


        if (stack) {
            this.stack = statck
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export {ApiError}