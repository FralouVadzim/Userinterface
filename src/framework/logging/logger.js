const log4js = require("log4js");
let logger = log4js.getLogger();

class Logger{

    static logInfo(message){        
        logger.level = "info";
        logger.info(message);
    }

    static logDebug(message){
        logger.level = "debug";
        logger.debug(message);;
    }

    static logError(message){
        logger.level = "error";
        logger.error(message);
    }
}

module.exports = Logger;