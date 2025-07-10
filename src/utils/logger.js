
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../../logs.txt");

function getTime() {
    return new Date().toISOString();
}

function writeLog(level , message){
    const logMessage = `[${getTime()}] [${level.toUpperCase()}] : ${message}\n`;

    console.log(logMessage);

    fs.appendFile(logFile , logMessage  , (err) => {
        if (err) console.log("Failed to write log:" , err);
    });
}

module.exports = {
    info : (msg) => writeLog('info' , msg),
    warn : (msg) => writeLog('warn' , msg),
    error : (msg) => writeLog('error' , msg),
};