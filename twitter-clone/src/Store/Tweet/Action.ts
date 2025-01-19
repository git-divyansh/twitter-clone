
import { FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_SUCCESS, GET_ALL_TWEETS_FAILURE, GET_ALL_TWEETS_SUCCESS, GET_USERS_TWEET_FAILURE, GET_USERS_TWEET_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_SUCCESS, TWEET_CREATE_FAILURE, TWEET_CREATE_SUCCESS, TWEET_DELETE_FAILURE, TWEET_DELETE_SUCCESS, USER_LIKE_TWEET_FAILURE, USER_LIKE_TWEET_SUCCESS } from "./ActionType";
import { api } from "../../Config/api";

export const getAllTweets = () => async (dispatch : any) => {
    try {
        const {data} = await api.get("/api/tweets");
        console.log("Get all tweets : ", data);
        dispatch({type:GET_ALL_TWEETS_SUCCESS, payload : data})
        
    } catch (error : any) {
        console.log(error);

        dispatch({type : GET_ALL_TWEETS_FAILURE, payload: error.message});
    }
}

export const getUsersTweets = (userId : string) => async (dispatch : any) => {
    try {
        const {data} = await api.get(`/api/tweets/user/${userId}`);
        console.log("Get user tweets : ", data);
        dispatch({type:GET_USERS_TWEET_SUCCESS, payload : data})
        
    } catch (error : any) {
        console.log(error);

        dispatch({type : GET_USERS_TWEET_FAILURE, payload: error.message});
    }
}

export const findTweetsByLikeContainUser = (userId : number) => async (dispatch : any) => {
    try {
        const {data} = await api.get(`/api/tweets/user/${userId}/likes`);
        console.log("User like tweets : ", data);
        dispatch({type:USER_LIKE_TWEET_SUCCESS, payload : data})
        
    } catch (error : any) {
        console.log(error);

        dispatch({type : USER_LIKE_TWEET_FAILURE, payload: error.message});
    }
}

export const findTweetById = (tweetId : string) => async (dispatch : any) => {
    try {
        const {data} = await api.get(`/api/tweets/${tweetId}`);
        console.log("Find tweets by id : ", data);
        dispatch({type:FIND_TWEET_BY_ID_SUCCESS, payload : data})
        
    } catch (error : any) {
        console.log(error);
        
        dispatch({type : FIND_TWEET_BY_ID_FAILURE, payload: error.message});
    }
}

export const createTweet = (tweetData : any) => async (dispatch : any) => {
    try {
        const {data} = await api.post(`/api/tweets/create`, tweetData);
        console.log("Created Tweet : ", data);
        dispatch({type:TWEET_CREATE_SUCCESS, payload : data})
        
    } catch (error : any) {
        console.log(error);
        
        dispatch({type : TWEET_CREATE_FAILURE, payload: error.message});
    }
}

export const createTweetReply = (tweetData : any) => async (dispatch : any) => {
    try {
        const {data} = await api.post(`/api/tweets/reply`, tweetData);
        console.log("Reply Tweet : ", data);
        dispatch({type:REPLY_TWEET_SUCCESS, payload : data})
        
    } catch (error : any) {
        console.log(error);
        
        dispatch({type : REPLY_TWEET_FAILURE, payload: error.message});
    }
}

export const createReTweet = (tweetId : number) => async (dispatch : any) => {
    try {
        const {data} = await api.put(`/api/tweets/${tweetId}/retweet`);
        console.log("Reply Tweet : ", data);
        dispatch({type:RETWEET_SUCCESS, payload : data})
        
    } catch (error : any) {
        console.log(error);
        
        dispatch({type : RETWEET_FAILURE, payload: error.message});
    }
}

export const likeTweet = (tweetId : number) => async (dispatch : any) => {
    try {
        const {data} = await api.post(`/api/tweets/${tweetId}/like`);
        console.log("Like Tweet : ", data);
        dispatch({type:LIKE_TWEET_SUCCESS, payload : data})
        
    } catch (error : any) {
        console.log(error);
        
        dispatch({type : LIKE_TWEET_FAILURE, payload: error.message});
    }
}

export const deleteTweet = (tweetId : number) => async (dispatch : any) => {
    try {
        const {data} = await api.post(`/api/tweets/${tweetId}`);
        console.log("Deleted Tweet : ", data);
        dispatch({type:TWEET_DELETE_SUCCESS, payload : tweetId})
        
    } catch (error : any) {
        console.log(error);
        
        dispatch({type : TWEET_DELETE_FAILURE, payload: error.message});
    }
}