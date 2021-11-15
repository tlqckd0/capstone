const fs = require('fs');
const path = require('path');

const roadCorrelation = async () => {
    const correlation_rate = JSON.parse(
        fs.readFileSync(path.join(__dirname, '/correlation/correlation1.json'))
    );
    return correlation_rate;
};

module.exports = {
    roadCorrelation,
};
