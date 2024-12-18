import { useCurrentUser } from "@/hooks/user";
import {useRouter} from "next/router" 
import TwitterLayout from "@/pages/twitterLayout";
import { GetServerSideProps, NextPage } from "next";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Image from "next/image";
import { FeedCard } from "@/components/feedcard";
import { GetCurrentUserQuery, Tweet, User } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { GetCurrentUserResponse } from "@/types/graphql";
import { useCallback, useMemo } from "react";
import { userInfo } from "os";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutations/user";
import { useQueryClient } from "@tanstack/react-query";

interface ServerProps {
    userInfo?: User; 
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
 
    const tweets = props.userInfo?.tweets; 
    const router = useRouter(); 
    const queryClient = useQueryClient(); 
    const { user: currentUser } = useCurrentUser(); 

    const amIFollowing = useMemo(() => {
        if (!props.userInfo) return false;
        return(( props.userInfo.follower?.findIndex((el) => el?.id === currentUser?.id) ?? -1) >= 0); 
    }, [currentUser?.id, props.userInfo]);


    const handleFollow = useCallback(async () => {
        if (!props.userInfo) return;
        await graphqlClient.request(followUserMutation, {to: props.userInfo.id})
        await queryClient.invalidateQueries({ queryKey : ["current-user"]})
    }, [props.userInfo , queryClient])
    

    const handleUnfollow = useCallback(async () => {
        if (!props.userInfo) return;
        await graphqlClient.request(unfollowUserMutation, {to: props.userInfo.id})
        await queryClient.invalidateQueries({ queryKey : ["current-user"]})
    }, [props.userInfo , queryClient])
    

    // console.log(props.userInfo); 
    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className=" border-b border-gray-600 flex justify-start gap-4 items-center">
                        <div className="text-2xl p-2">
                            <IoArrowBackCircleOutline />
                        </div>
                        <div>
                        <p className="font-semibold p-2 text-2xl text-gray-300">{props.userInfo?.firstName}</p>
                        </div>
                      
                    </nav>
                    {props.userInfo?.profileImageURL && <div className="p-3 flex flex-col items-start border-b border-slate-600">
                        <div className="flex justify-end items-start gap-7 ">
                        <Image
                        src = {props.userInfo?.profileImageURL}
                        alt="user-image"
                        height={200}
                        width={200}    
                            ></Image>
                        </div>
                        
                        <div className="mt-4 flex flex-col gap-1 ">
                            <p className="text-2xl">{props.userInfo.firstName} {props.userInfo.lastName}</p>
                            <p className="text-[10px] text-slate-700">{props.userInfo.email}</p>
                        </div>
                        <div className="flex justify-between w-full m-2 ml-0">
                                <div className="flex justify-start items-center text-gray-300 font-mono gap-6">
                                    <p >{props.userInfo.follower?.length} <span className="text-gray-600 text-sm">followers</span></p>
                                    <p>{props.userInfo.following?.length} <span className="text-gray-600 text-sm">following</span> </p>
                                </div>
                            {currentUser?.id !== props.userInfo.id && <button className="font-semibold uppercase bg-white rounded-full px-2 py-1 text-gray-950 text-sm" onClick={amIFollowing ? handleUnfollow : handleFollow}>
                                {amIFollowing ? "Unfollow" : "Follow"}
                            </button>}
                        </div>
                    </div>
                    
                    }
                    <div>
                        <div className="text-center font-semibold font-sans text-lg py-1 border-b border-slate-600">Tweets</div>
                        <div>
                        { 
                            tweets?.map((tweet )  => tweet ?  <FeedCard key={tweet.id} data={tweet} /> : null) 
                        }
                        </div>
                    </div>
                </div>
            </TwitterLayout>
    </div>
    )
}


export const getServerSideProps: GetServerSideProps<ServerProps> = async (context) => {
    const id = context.query.id as string | undefined; 
    if (!id) return { notFound: true , props : {userInfo : undefined }}; 

    const userInfo = await graphqlClient.request(getUserByIdQuery, { id }); 
    if (!userInfo)
    {
        return { notFound: true, props: { userInfo : undefined } }; 
    }

    return {
        props: {
            userInfo: userInfo.getUserById as User ,  
        }
    }
}
export default UserProfilePage; 