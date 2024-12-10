import React from 'react'
import Image from 'next/image'
import { CiBookmark, CiHeart } from 'react-icons/ci'
import { FaRegComment } from 'react-icons/fa'
import { BiRepost } from 'react-icons/bi'
import { IoShareOutline } from 'react-icons/io5'
import { IoIosMore } from 'react-icons/io'
import { Tweet } from '@/gql/graphql'

interface ActivityInterface {
  icon: React.ReactNode, 
  count: string,
  hoverColorClass?: string // Add hover color class
}

const Activity: ActivityInterface[] = [
  { icon: <FaRegComment />, count: "23k", hoverColorClass: 'text-blue-700' },
  { icon: <BiRepost />, count: "5k", hoverColorClass: 'text-green-500' }, // green on hover for repost
  { icon: <CiHeart />, count: "104k", hoverColorClass: 'text-red-500' },  // red on hover for like
  { icon: <CiBookmark />, count: "23k", hoverColorClass: 'text-blue-700' },
]

interface FeedCardProps {
    data : Tweet
  }

export const FeedCard: React.FC<FeedCardProps> = (props) => {

 const { data } = props; 

  return (
    <div className='grid grid-cols-12 border border-gray-600 border-b-0 border-x-0 p-4'>
      <div className='col-span-2 '>
        <div className='flex justify-center'>
          { data.author && data.author?.profileImageURL && <Image src= {data.author.profileImageURL} alt="this" width={50} height={50} className='rounded-full' /> }
        </div>
      </div>
      <div className='col-span-10'>
        <div className='grid grid-cols-10'>
          <div className='col-span-9'>
            <div className='font-semibold text-[16px]'>{data.author?.firstName} {data.author?.lastName }</div>
            <p className='pt-1'>{ data.content}</p>    
          </div>
          <div className='col-span-1 flex items-center justify-center'>
            <IoIosMore  className="text-3xl cursor-pointer" />
          </div>
        </div>
       { data.imageURL &&  <div className="flex justify-start mt-[40px] rounded-[20px] w-[97%]"> 
          <Image
            src= {data.imageURL}
            alt={data.content}
            width={500}
            height={500}
            className="rounded-[16px] w-full h-auto"
          />
        </div>}
        <div className='grid grid-cols-10 mt-10 border border-gray-600 p-4 border-r-0 border-l-0 mx-4'>
          {
            Activity.map((item, index) => (
              <div key={index} className='col-span-2 flex items-center gap-1 cursor-pointer group'>
                <div className={`text-[20px] text-gray-400 rounded-full p-1 transition-all group-hover:bg-opacity-30 group-hover:${item.hoverColorClass}`}>
                  {item.icon}
                </div>
                <p className={`text-gray-400 transition-all group-hover:${item.hoverColorClass}`}>{item.count}</p>
              </div>
            ))
          }
          <div className='col-span-2 flex justify-end text-[24px] '>
            <div className='rounded-full p-1transition-all hover:bg-blue-700 hover:bg-opacity-30'>
              <IoShareOutline className='text-gray-400 transition-all hover:text-blue-700' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
