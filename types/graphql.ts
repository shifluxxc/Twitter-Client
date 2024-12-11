import { User } from "@/gql/graphql";

export interface GetCurrentUserResponse {
    getUserById: User;
    getCurrentUser: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      profileImageURL?: string;
    };
  }
  