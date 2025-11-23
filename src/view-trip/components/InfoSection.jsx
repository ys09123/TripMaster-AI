import React from 'react'
import { Button } from '../../components/ui/button';
import { CiShare1 } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";



function InfoSection({trip}) {
    // console.log(trip);
  const getImageSrc = (tripType) => {
    if (tripType === 'Solo') return '/ViewTrip/solo.jpg';
    if (tripType === 'Family') return '/ViewTrip/family.jpg';
    if (tripType === 'Friends') return '/ViewTrip/friends.jpg';
    if (tripType === 'Couple') return '/ViewTrip/couple.jpg';
    return '/placeholder.webp'; // fallback
  };
  return (
    <div>
      <img src={getImageSrc(trip?.userData?.traveller)} className='h-[340px] w-full object-cover rounded-lg'/>
      <div className='flex justify-between items-center text-xs md:text-md'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='text-center md:text-left font-bold text-2xl text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.6)]'>{trip?.userData?.location?.label || "No location available"}</h2>
            <div className='flex flex-col items-center md:flex-row gap-5'>
                <h2 className='py-1 px-3 bg-gray-200 rounded-full text-gray-700'>{Object.values(trip?.tripData || {})[0]?.durationDays} Days</h2>
                <h2 className='py-1 px-3 bg-gray-200 rounded-full text-gray-700'>{trip?.userData?.budget} Budget</h2>
                <h2 className='py-1 px-3 bg-gray-200 rounded-full text-gray-700'>{trip?.userData?.traveller} Trip</h2>
                <Button><CiShare1 /></Button>
            </div>
        </div>
      </div>

    </div>
  )
}

export default InfoSection
