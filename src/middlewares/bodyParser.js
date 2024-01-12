const bodyParser = () => {
    return (req, res, next) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
            req.body = data ? JSON.parse(data) : {};
            next();
        });
    };
};

module.exports = bodyParser;