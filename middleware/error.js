const error = (err, req, res, next) => {
    console.error(err.stack);
  
    res.status(500).json({
      error: {
        message: err.message,
        stack: err.stack,
      },
    });
  };
  
  module.exports = error;
  