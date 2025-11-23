import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  const getImageSrc = (tripType) => {
    if (tripType === 'Solo') return '/MyTrip/solo.jpg';
    if (tripType === 'Family') return '/MyTrip/family.jpg';
    if (tripType === 'Friends') return '/MyTrip/friends.jpg';
    if (tripType === 'Couple') return '/MyTrip/couple.jpg';
    return '/placeholder.webp'; // fallback
  };
  return (
    <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all bg-[rgba(0,0,0,0.6)] p-5 rounded-2xl w-80'>
            <img src={getImageSrc(trip?.userData?.traveller)} className='object-cover rounded-xl' />
            <div>
                <h2 className='font-bold text-lg text-white mt-2'>{trip?.userData?.location?.label}</h2>
                <h2 className='text-sm text-gray-200'>{Object.values(trip?.tripData || {})[0]?.durationDays} Days | {trip?.userData?.budget} Budget | {trip?.userData?.traveller} Trip</h2>
            </div>
        </div>
    </Link>
  )
}

export default UserTripCardItem
