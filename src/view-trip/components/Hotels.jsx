import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({trip}) {
  return (
    <div className='bg-[rgba(0,0,0,0.3)] p-10 rounded-xl'>
      <h2 className='font-bold text-2xl mt-2 text-center text-white'>Hotel Recommendation</h2>
      <div className='flex justify-center mt-2'><div className='md:w-[5vw] md:hover:w-[7vw] transition-all w-[10vw] h-2 rounded-xl bg-white'></div></div>
      <div className='grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-5 py-5 mt-3 justify-items-center'>
        {Object.values(trip?.tripData || {})[0]?.hotelOptions?.map((hotel, index)=>(
            <Link key={hotel.id || index} to={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(hotel?.hotelName + ", " + hotel?.hotelAddress)} target='_blank'>
              <div className='hover:scale-102 transition-all bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] p-5 px-7 rounded-xl'>
                  {/* <img src="/placeholder.webp" className='rounded-xl'/> */}
                  <div className='my-2 flex flex-col gap-2'>
                      <h2 className='font-medium text-white'>{hotel.hotelName}</h2>
                      <h2 className='text-xs text-gray-200'>📍 {hotel.hotelAddress}</h2>
                      <h2 className='text-sm text-yellow-300'>{hotel.pricePerNightEstimate}</h2>
                      <h2 className='text-sm text-white'>⭐ {hotel.rating}</h2>
                  </div>
              </div>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels
