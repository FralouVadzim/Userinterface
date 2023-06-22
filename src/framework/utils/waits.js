const fs = require("fs");
const timeouts = require('../configuration/timeouts.json');
const Logger = require('../logging/logger');

class Waits{

    static #sleepTimeout = 50;

    static #sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

    static checkIfFileExists(path, timeout=timeouts.timeoutMedium){    
        Logger.logInfo(`Check if file '${path}' exists`);    
        let result = false;
        if(timeout){
            const date = new Date();
            let currentDate = new Date();
            while(currentDate - date < timeout){
                if(fs.existsSync(path)){
                    result = true;
                    break;
                }
                this.#sleep(this.#sleepTimeout);
                currentDate = new Date();
            }
        }else{
            result = fs.existsSync(path);
        }
        Logger.logInfo(`Result is ${result}`);
        return result;
    }
}

module.exports = Waits;