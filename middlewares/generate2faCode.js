const generate2faCode = (length = 6) => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = generate2faCode;
    