export interface GetCurrentUserResponse {
    getCurrentUser: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      profileImageURL?: string;
    };
  }
  