import React from 'react'
import { Link } from 'react-router-dom';

function PlaceCardItem({place, trip}) {
  return (
    <Link
    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${place.placeName}, ${Object.values(trip?.tripData || {})[0]?.location}`
    )}`}
    target="_blank"
    >
        <div className='border rounded-lg p-3 mt-2 flex gap-3 bg-[rgba(255,255,255,0.4)]'>
            <img src='/location.jpg' className='w-[150px] h-[130px] rounded-xl object-cover' />
            <div>
                <h2 className='font-bold text-lg'>{place.placeName}</h2>
                <p className='text-xs text-gray-800'>{place.details}</p>
                {/* <h2 className='mt-2 text-sm'>🕜 Time to Travel: {place.timeToTravel}</h2> */}
                <h2 className='mt-2 text-sm text-orange-700'>🎫 {place.ticketPricing}</h2>
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem
