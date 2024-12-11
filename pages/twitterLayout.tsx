import React, { useCallback, useMemo } from "react";
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
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] }); 

interface TwitterLayoutProps {
    children: React.ReactNode
}
interface TwitterSideBarButton {
    title: string;
  icon: React.ReactNode;
  link: string;
  }


  const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
    const { user } = useCurrentUser ();
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
      
            if (verifyGoogleToken) {
                console.log(verifyGoogleToken);
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

    const sideBarMenuItems: TwitterSideBarButton[] = useMemo(() => [
      {
        title: "Home",
        icon: <IoIosHome />,
        link : "/"
      },
      {
        title: "Explore",
        icon: <CiSearch />,
        link : "/"
      },
      {
        title: "Notifications",
        icon: <IoMdNotificationsOutline />,
        link : "/"
      },
      {
        title: "Messages",
        icon: <MdOutlineEmail />,
        link : "/"
      },
      {
        title: "Bookmarks",
        icon: <CiBookmark />,
        link : "/"
      },
      {
        title: "Profile",
        icon: <IoPersonOutline />,
        link : `/${user?.id}`

      },
      {
        title: "More",
        icon: <CiCircleMore />,
        link : "/"
      },
    
    ] , [user?.id]);
    
    return (
        <div className="grid grid-cols-12">
            <aside className="h-screen sticky top-0 col-span-1"></aside>
            <aside className="h-screen sticky top-0 col-span-2 ">
    <div className="h-fit w-fit text-3xl rounded-full hover:bg-slate-900 p-2 transition-all ">
            <BsTwitter />
          </div >
          <div className="mt-5 text-[20px] flex flex-col align-top ">
            <ul className="py-2">
              {sideBarMenuItems.map((item) => (
                  <Link href={item.link} key={item.title}
                    className="flex justify-start w-fit items-center gap-5 pr-4 py-2 hover:bg-gray-900 rounded-full transition">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="mr-2 hover:font-semibold cursor-pointer">{item.title}</span>
                  </Link>
              ))}
            </ul>
            <div className="rounded-full bg-blue-500 text-center mr-12 mt-7">
              <button className="p-1"> Post </button>
            </div>
          </div>
          <div className="grid grid-cols-4 bg-gray-800 w-[14rem] rounded-full mt-[12rem] ">
            <div className="col-span-1 p-3 ">
              {
                user && user.profileImageURL && <Image className="rounded-full" src={user?.profileImageURL} alt="X" height={50} width={50} />
            }
          </div>
          <div className="col-span-3 flex justify-center items-center text-md text-gray-500">
            {user && <p>{user.firstName} { user.lastName}</p>}
            </div>
                    </div>
            </aside>
            <main className="col-span-6 border border-r-[1px] border-gray-400">
            {props.children} 
            </main>
            <aside className="h-screen sticky top-0 col-span-3">
      <div className=" border-l-[1px] p-5 ">
          { (
                  <div className="bg-slate-900 p-5 flex flex-col items-start space-y-4 runded-full">
                  <h2 className="text-[20px] font-semibold">New To Twitter ?</h2>
                  <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
                    </div>
            )
          }
        </div>
        </aside>
           
        </div>
    );
}

export default TwitterLayout ; 