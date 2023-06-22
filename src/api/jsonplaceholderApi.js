import { BaseApi } from './baseApi.js';
import config from "../config/config.json" assert {type: 'json'};
import headers from "../config/headers.json" assert {type: 'json'};
import path from "path";

export class JsonplaceholderApi extends BaseApi{
    
    static #baseUrl = config.baseUrl
    static #routePosts = config.routePosts;
    static #routeUsers = config.routeUsers;

    static async getAllPosts(){
        const response = await this.getRequest(path.join(this.#baseUrl, this.#routePosts));
        return this.#getObjectToReturn(response)
    }

    static async getAllUsers(){
        const response = await this.getRequest(path.join(this.#baseUrl, this.#routeUsers));
        return this.#getObjectToReturn(response)
    }

    static async getPostById(id){
        const response = await this.getRequest(path.join(this.#baseUrl, this.#routePosts, id));
        return this.#getObjectToReturn(response)
    }

    static async getUserById(id){
        const response = await this.getRequest(path.join(this.#baseUrl, this.#routeUsers, id));
        return this.#getObjectToReturn(response)
    }

    static async getCreatedPost(userTitle, userBody, userId){
        const body = this.#getBodyForPostUser(userTitle, userBody, userId)
        const response = await this.postRequest(path.join(this.#baseUrl, this.#routePosts), body);
        return this.#getObjectToReturn(response)
    }

    static #getObjectToReturn(response){
        return {
            statusCode: response.status,
            contentType: response.headers[headers.contentType],
            data: response.data
        }
    }

    static #getBodyForPostUser(title, body, userId){
        return {
            title: title,
            body: body,
            userId: userId,
        }        
    }
}
