import {assert} from "chai";
import config from "../config/config.json" assert {type: 'json'};
import testData from "../resources/testData.json" assert {type: 'json'};
import statusCode from "../config/statusCode.json" assert {type: 'json'};
import contentType from "../config/contentType.json" assert {type: 'json'};
import {StringUtils} from "../utils/stringUtils.js"
import {JsonplaceholderApi} from "../api/jsonplaceholderApi.js"

describe('Api test', function(){
    it('Jsonplaceholder test', async() =>{

        // Step 1
        const api = new JsonplaceholderApi();
        const allPosts = await api.getAllPosts();
        const allPostsData = Object.values(allPosts.data);
        const allPostsDataSorted = [...allPostsData].sort((user1, user2) => {return user1.id - user2.id});
        assert.equal(allPosts.statusCode,statusCode.StatusCodeOK, 'Status codes are not equal');
        assert.include(allPosts.contentType, contentType.jsonType, `Content type does not ${contentType.jsonType}`);
        assert.deepEqual(allPostsData, allPostsDataSorted, 'Users are not sorted by ID');

        // Step 2
        const post99 = await api.getPostById(testData.request2RouteValue);
        assert.equal(post99.statusCode, statusCode.StatusCodeOK, 'Status codes are not equal');
        assert.equal(post99.data.userId, testData.responce2UserID, 'User id does not match expected');
        assert.equal(post99.data.id, testData.responce2ID, 'Id does not match expected');
        assert.isNotEmpty(post99.data.title, 'Title is empty');
        assert.isNotEmpty(post99.data.body, 'Body is empty');

        // Step 3
        const post150 = await api.getPostById(testData.request3RouteValue);
        assert.equal(post150.statusCode, statusCode.StatusCodeNotFound, 'Status codes are not equal');
        assert.isEmpty(post150.data, 'Responce body is not empty');

        // Step 4
        const userTitleToPost = StringUtils.generateRandomString(config.NumberOfCharsForTitleForRequest4);
        const userBodyToPost = StringUtils.generateRandomString(config.NumberOfCharsForBodyForRequest4);
        const createdPost = await api.getCreatedPost(userTitleToPost, userBodyToPost, testData.responce4UserId);
        assert.equal(createdPost.statusCode, statusCode.StatusCodeCreated, 'Status codes are not equal');
        assert.equal(createdPost.data.userId, testData.responce4UserId, 'User id does not match expected');
        assert.equal(createdPost.data.body, userBodyToPost, `User body does not match expected "${userBodyToPost}`);
        assert.equal(createdPost.data.title, userTitleToPost, `User title does not match expected "${userTitleToPost}`);
        assert.isNumber(createdPost.data.id, 'User id is empty');
    })
})