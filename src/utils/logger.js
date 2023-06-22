import log4js from "log4js";

const logger = log4js.getLogger();

export class Logger{

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