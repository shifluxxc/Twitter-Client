import { BsTwitter } from "react-icons/bs";
import { CiBookmark, CiCircleMore, CiSearch } from "react-icons/ci";
import { IoIosHome, IoMdNotificationsOutline } from "react-icons/io";
import {  IoPersonOutline } from "react-icons/io5";
import { MdImageSearch, MdOutlineEmail } from "react-icons/md";
import { Inter } from "next/font/google";  
import { FeedCard } from "@/components/feedcard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] }); 
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

export default function Home() {

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


  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input"); 
    input.setAttribute('type', 'file'); 
    input.setAttribute('accept', 'image/*');; 
    input.click();
  }, []);
  

  return (

    <div className="grid grid-cols-12">
    <aside className="h-screen sticky top-0 col-span-2">
    <div className="h-fit w-fit text-3xl rounded-full hover:bg-slate-900 p-2 transition-all ml-5">
            <BsTwitter />
          </div>
          <div className="mt-5 text-[20px] ml-5">
            <ul className="py-2">
              {sideBarMenuItems.map((item) => (
                <li
                  key={item.title}
                  className="flex justify-start w-fit items-center gap-5 pr-4 py-2 hover:bg-gray-900 rounded-full transition"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="mr-2 hover:font-semibold cursor-pointer">{item.title}</span>
                </li>
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
        <div className='grid grid-cols-12 border border-gray-600 border-b-0 border-x-0 p-4'>
          <div className='col-span-2 '>
          {user?.profileImageURL && <div className='flex justify-center'>
          <Image src={user?.profileImageURL} alt="this" width={50} height={50} className="rounded-full" />
        </div>}
          </div>
          <div className="col-span-10">
            <textarea placeholder="What's Happening" className="w-full bg-transparent border-b border-gray-700" rows={4}></textarea>
            <div className="flex justify-between items-center cursor-pointer">
              <MdImageSearch className="text-xl" onClick={handleSelectImage}/>
              <div className="rounded-full px-4 py-1 h-7 bg-blue-500 text-sm flex items-center">
              <button className="p-1"> Post </button>
            </div>
            </div>
            
          </div>
          
          </div>
       <div >
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard/>
        </div>
    
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
