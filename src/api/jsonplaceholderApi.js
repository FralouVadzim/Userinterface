import { BaseApi } from './baseApi.js';
import config from "../config/config.json" assert {type: 'json'};
import headers from "../config/headers.json" assert {type: 'json'};
import path from "path";

export class JsonplaceholderApi extends BaseApi{
    #baseUrl;
    #routePosts;
    #routeUsers;

    constructor(){
        super();
        this.#baseUrl = config.baseUrl;
        this.#routePosts = config.routePosts;
        this.#routeUsers = config.routeUsers;
    }
    
    async getAllPosts(){
        const response = await this.getRequest(path.join(this.#baseUrl, this.#routePosts));
        return this.#getObjectToReturn(response)
    }

    async getPostById(id){
        const response = await this.getRequest(path.join(this.#baseUrl, this.#routePosts, id));
        return this.#getObjectToReturn(response)
    }

    async getCreatedPost(userTitle, userBody, userId){
        const body = this.#getBodyForPostUser(userTitle, userBody, userId)
        const response = await this.postRequest(path.join(this.#baseUrl, this.#routePosts), body);
        return this.#getObjectToReturn(response)
    }

    #getObjectToReturn(response){
        return {
            statusCode: response.status,
            contentType: response.headers[headers.contentType],
            data: response.data
        }
    }

    #getBodyForPostUser(title, body, userId){
        return {
            title: title,
            body: body,
            userId: userId,
        }        
    }
}
