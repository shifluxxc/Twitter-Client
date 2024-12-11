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

interface ServerProps {
    userInfo?: User; 
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
 
    const tweets = props.userInfo?.tweets; 
    const router = useRouter(); 
    // console.log(props.userInfo); 
    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className=" border-b border-gray-600 flex justify-start gap-4 items-center">
                        <div className="text-2xl p-2">
                            <IoArrowBackCircleOutline />
                        </div>
                            <p className="font-semibold p-2 text-2xl text-gray-300">{props.userInfo?.firstName}</p>
                    </nav>
                   {props.userInfo?.profileImageURL &&  <div className="p-3 flex flex-col items-start border-b border-slate-600 ">
                        <Image
                        src = {props.userInfo?.profileImageURL}
                        alt="user-image"
                        height={200}
                        width={200}    
                        ></Image>
                        <div className="mt-4 flex flex-col gap-1">
                            <p className="text-2xl">{props.userInfo.firstName} {props.userInfo.lastName}</p>
                            <p className="text-sm text-slate-400">{props.userInfo.email}</p>
                        </div>
                    </div>}
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

    const userInfo = await graphqlClient.request<GetCurrentUserResponse>(getUserByIdQuery, { id }); 
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