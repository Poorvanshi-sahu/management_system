module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    console.log("came here", err);

    return res.status(statusCode).json({
        success: false,
        error: {
            code: err.name,
            messages: err.message || "INTERNAL SERVER ERROR"
        }
    })
}