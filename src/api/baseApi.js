import axios from 'axios';
import { Logger } from '../utils/logger.js';

export class BaseApi{
    
    static async getRequest(path){
        Logger.logInfo(`Request data from ${path}'`);
        return axios.get(path,{
            validateStatus: function (status) {
              return status < 500;
            }
        });
    }

    static async postRequest(url, body){
        Logger.logInfo(`Post data to ${url}`);
        return axios.post(url, body)
    }
}