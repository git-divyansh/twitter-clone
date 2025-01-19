export interface loginResponse {
    jwt : string;
    status : boolean;
}

export interface userSchema {
    id: string;
    fullName: string;
    email: string;
    image: string;
    location: string;
    website: string;
    brithDate: string;
    mobile: string;
    backgroundImage: string;
    bio: string;
    req_user: string;
    login_with_google: boolean;
    followers: userSchema[];
    following: userSchema[];
    followed: boolean;
    verified: boolean;
}

export interface initialStateAuth  {
    user : userSchema | null;
    loading : boolean;
    error : string | null;
    jwt : string | null;
    findUser : userSchema | null
}

export interface initialStateTweet  {
    loading : boolean;
    data : any;
    error : string | null;
    tweets : any;
    tweet : any;
    likedTweets : any;
    like : any;
    retweet : any;
    replyTweets : any
}