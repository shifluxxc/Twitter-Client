import { GraphQLClient } from "graphql-request";

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:8000/graphql";

const isClient = typeof window !== "undefined";

// GraphQL client setup
export const graphqlClient = new GraphQLClient(API_URL, {
    headers: {
        Authorization: isClient
            ? `Bearer ${window.localStorage.getItem("twitter_token") || ""}`
            : "",
    },
});
