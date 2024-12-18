import { graphqlClient } from "@/clients/api"; // Adjust the import path as necessary
import { getCurrentUserQuery, GetCurrentUserResponse } from "@/graphql/query/user"; // Adjust the import path as necessary
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser  = () => {
    const query = useQuery({
        queryKey: ['current-user'],
        queryFn : async () => {
            const data = await graphqlClient.request<GetCurrentUserResponse>(getCurrentUserQuery);
            return data;
        }
    });

    return { ...query, user: query.data?.getCurrentUser };
}