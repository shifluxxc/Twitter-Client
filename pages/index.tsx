import { CiBookmark, CiCircleMore, CiSearch } from "react-icons/ci";
import { IoIosHome, IoMdNotificationsOutline } from "react-icons/io";
import {  IoPersonOutline } from "react-icons/io5";
import { MdImageSearch, MdOutlineEmail } from "react-icons/md";
import { Inter } from "next/font/google";  
import { FeedCard } from "@/components/feedcard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/pages/twitterLayout";
import { GetServerSideProps } from "next";
import { getAllTweetQuery, GetAllTweets } from "@/graphql/query/tweet";

const inter = Inter({ subsets: ["latin"] }); 
interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
}


 interface HomeProps {
  tweets: Tweet[] ,
}
const sideBarMenuItems: TwitterSideBarButton[] = [
  {
    title: "Home",
    icon: <IoIosHome />,
  },
  {
    title: "Explore",
    icon: <CiSearch />
    ,
  },
  {
    title: "Notifications",
    icon: <IoMdNotificationsOutline />
    ,
  },
  {
    title: "Messages",
    icon:<MdOutlineEmail />,
  },
  {
    title: "Bookmarks",
    icon: <CiBookmark />,
  },
  {
    title: "Profile",
    icon: <IoPersonOutline />
    ,
  },
  {
    title: "More",
    icon: <CiCircleMore />
,
  },

];

export default function Home(props : HomeProps) {

  const { user } = useCurrentUser();
  const { mutate } = useCreateTweet();

  const [content, setContent] = useState(''); 

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input"); 
    input.setAttribute('type', 'file'); 
    input.setAttribute('accept', 'image/*');; 
    input.click();
  }, []);
  
  const handleCreateTweet = useCallback(() => {
    mutate({
      content 
    })
   }, [content , mutate]); 

  return (

    <TwitterLayout>
        <div className='grid grid-cols-12 border border-gray-600 border-b-0 border-x-0 p-4'>
          <div className='col-span-2 '>
          {user?.profileImageURL && <div className='flex justify-center'>
          <Image src={user?.profileImageURL} alt="this" width={50} height={50} className="rounded-full" />
        </div>}
          </div>
          <div className="col-span-10">
            <textarea value= {content} onChange={e => setContent(e.target.value)} placeholder="What's Happening" className="w-full bg-transparent border-b border-gray-700" rows={4}></textarea>
            <div className="flex justify-between items-center cursor-pointer">
              <MdImageSearch className="text-xl" onClick={handleSelectImage}/>
              <div className="rounded-full px-4 py-1 h-7 bg-blue-500 text-sm flex items-center">
              <button className="p-1" onClick={handleCreateTweet}> Post </button>
            </div>
            </div>
            
          </div>
          
          </div>
        <div >
          { 
           props.tweets?.map((tweet : Tweet)  => tweet ?  <FeedCard key={tweet.id} data={tweet} /> : null) 
          }
      </div>
      </TwitterLayout>



  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const allTweets = await graphqlClient.request<GetAllTweets>(getAllTweetQuery); 
  return {
    props :  {
      tweets: allTweets.getAllTweets as Tweet[] , 
    }
  }
}