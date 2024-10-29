import { BiSolidShoppingBags } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { CiBookmark, CiCircleMore, CiSearch } from "react-icons/ci";
import { IoIosHome, IoMdNotificationsOutline } from "react-icons/io";
import {  IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Inter } from "next/font/google";  
import { FeedCard } from "@/components/feedcard";

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
  return (
    <div  className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 border-r-[1px] border-slate-200">
          <div className="h-fit w-fit text-3xl rounded-full hover:bg-slate-900 p-2 transition-all">
            <BsTwitter />
          </div>
          <div className="mt-5 text-[20px]">
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
        </div>
        <div className="col-span-6 ">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard/>
        </div>
        <div className="col-span-3 border-l-[1px] border-white"></div>
      </div>
    </div>
  );
}
