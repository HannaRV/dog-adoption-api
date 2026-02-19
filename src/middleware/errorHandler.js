const errorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500

  res.status(statusCode).json({
    error: {
      message: error.message,
      status: statusCode
    }
  })
}

export default errorHandler