const crypto = require('crypto');

module.exports = {
    // Generates a response object for succesful requests
    successResponse: (data, message = 'Success') => {
        return { status: 'success', message, data};
    },

    // Generates a response object for error situations
    errorResponse: (message = 'Error', code=500) => {
        return { status: 'error', message, code};
    },

    // Formats and sends a JSON response
    sendResponse: (res, data, statusCode=200) => {
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    },

    // Checks if an object is empty
    isEmpty: (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    },

    // Safely parses JSON and handles exceptions
    safeJsonParse: (str) => {
        try {
            return [null, JSON.parse(str)];
        } catch (error) {
            return [error, null];
        }
    },

    // Validates email format
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    },

    // Hashes a password (or any string) using Node's crypto module
    hashPassword: (password) => {
        return crypto.createHash('sha256').update(password).digest('hex');
    },

    // Generates a random token for authentication purposes
    generateToken: (length = 48) => {
        return crypto.randomBytes(length).toString('hex');
    },

    // Formats a date into a readable string
    formatDate: (date, format = 'YYYY-MM-DD HH:mm:ss') => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    },

    // Deep clone an object (to avoid reference issues)
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },

    // Paginate array data
    paginate: (array, page_size, page_number) => {
        return array.slice((page_number - 1) * page_size, page_number * page_size );
    },

    // Converts a string to CamelCase
    toCamelCase: (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.lowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    // Other useful helpers can be added here
};