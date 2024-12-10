import { graphqlClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutations/tweet"
import { getAllTweetQuery, GetAllTweets } from "@/graphql/query/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async (payload: CreateTweetData) =>
        await graphqlClient.request(createTweetMutation, { payload }),
  
      onMutate: () => {
        // Show a loading toast
        toast.loading("Creating Tweet", { id: "create-tweet" });
      },
  
      onSuccess: () => {
        // Invalidate the tweets query to refetch tweets
        queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
  
        // Dismiss the loading toast and show a success message
        toast.dismiss("create-tweet");
        toast.success("Tweet created successfully!");
      },
  
      onError: (error) => {
        // Dismiss the loading toast and show an error message
        toast.dismiss("create-tweet");
        toast.error("Failed to create tweet. Please try again.");
        console.error(error);
      },
    });
  
    return mutation;
  };

export const useGetAllTweets = () => { 
    const query = useQuery<GetAllTweets>({
        queryKey: ['all-tweets'],
        queryFn: async () => {
            const data = await graphqlClient.request<GetAllTweets>(getAllTweetQuery);
            return data;
        }
    }); 

    return { ...query, tweets: query.data?.getAllTweets }; 
}