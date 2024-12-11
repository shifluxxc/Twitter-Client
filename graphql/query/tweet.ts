import { graphql } from "@/gql";
import { Tweet } from "@/gql/graphql";

export interface GetAllTweets {
    getAllTweets: Tweet[] 
}

export const getAllTweetQuery = graphql(`#graphql
    
    query GetAllTweets
    {
            getAllTweets {
            id
            content
            imageURL
            author {
            firstName
            lastName
            profileImageURL
            id
            }  
        }
    }
    `)