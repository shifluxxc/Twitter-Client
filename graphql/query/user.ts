import { Tweet } from "@/gql/graphql";
import { graphql } from "../../gql"; // Adjust the path if needed
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
// GraphQL query to verify the Google token
export const verifyUserGoogleTokenQuery = graphql(`#graphql 
    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`);
export interface GetCurrentUserResponse {
    getCurrentUser: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
        profileImageURL?: string;
        tweets: [Tweet]; 
    };
  }
// Define the query with the expected response type
export const getCurrentUserQuery= graphql(`
    query GetCurrentUser {
  getCurrentUser {
    id
    firstName
    lastName
    follower {
            id
            firstName
            lastName
            profileImageURL
            }
            following {
            id
            firstName
            lastName
            profileImageURL
            }

        recommendedUsers {
        id
        firstName
        lastName 
        profileImageURL
      }
    email
    profileImageURL
    tweets {
      id
      content
    }
  }
}
`);

export const getUserByIdQuery = graphql(`#graphql
            query GetuserById($id: ID!) {
        getUserById(id: $id) {
            id
            firstName
            lastName
            email
            profileImageURL
            follower {
            id
            firstName
            lastName
            profileImageURL
            }
            following {
            id
            firstName
            lastName
            profileImageURL
            }
            tweets {
            author {
                email
                firstName
                profileImageURL
            }
            content
            id
            imageURL
            }
        }
        }
    
    `); 