const fs = require("fs");

class Waits{

    static sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

    static checkIfFileExists(path, timeout){        
        let result = false;
        if(timeout){
            const date = new Date();
            let currentDate = new Date();
            while(currentDate - date < timeout){
                if(fs.existsSync(path)){
                    result = true;
                    break;
                }
                this.sleep(50);
                currentDate = new Date();
            }
        }else{
            result = fs.existsSync(path);
        }        
        return result;
    }
}

module.exports = Waits;