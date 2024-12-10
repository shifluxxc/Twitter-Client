import React, { useCallback } from "react";
import { BsTwitter } from "react-icons/bs";
import { CiBookmark, CiCircleMore, CiSearch } from "react-icons/ci";
import { IoIosHome, IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import toast from "react-hot-toast";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] }); 

interface TwitterLayoutProps {
    children: React.ReactNode
}
interface TwitterSideBarButton {
    title: string;
    icon: React.ReactNode;
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

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
    const { user } = useCurrentUser();
    const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
        const googleToken = cred.credential;
        console.log(googleToken);
        if (!googleToken) {
          return toast.error('Google Token not found.');
        }
      
        try {
          const response = await graphqlClient.request(
            verifyUserGoogleTokenQuery,
            { token: googleToken }
          );
      
          const { verifyGoogleToken } = response;
      
      
          if (verifyGoogleToken)
          {
          console.log(verifyGoogleToken); // Debug the token value here
            window.localStorage.setItem("twitter_token", verifyGoogleToken);
            console.log(window.localStorage.getItem("twitter_token")); 
            toast.success("Verified successfully!");
          } else {
            toast.error("Token verification failed. Server returned null.");
          }
        } catch (error) {
          console.error("Error verifying Google token:", error);
          toast.error("An error occurred while verifying the token.");
        }
      }, []);
    

    return (
      <div></div>
    )
}

export default TwitterLayout ; 