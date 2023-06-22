const Logger = require('../logging/logger');
const timeouts = require('../configuration/timeouts.json');

class BaseForm{
    constructor(uniqueElement, name){
        this.uniqueElement = uniqueElement;
        this.name = name;
    }
    
    async isOpened(timeout = timeouts.timeoutSmall){
        Logger.logInfo(`Check that form '${this.name}' is opened`);
        if(timeout){            
            return this.uniqueElement.isPresent(true, timeout);
        }else{
            return this.uniqueElement.isPresent();
        }
    }

    async isClosed(){
        Logger.logInfo(`Check that form '${this.name}' is closed`);
        if(await this.uniqueElement.isPresent()){
            await this.uniqueElement.waitUntilElementIsBecomeStaleOrNotLocated();
        }
        return this.uniqueElement.isPresent();
    }
}

module.exports = BaseForm;