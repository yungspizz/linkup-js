const cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Additional CORS headers...
    next();
}

module.exports = cors;