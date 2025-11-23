import React from 'react'
import { Link } from 'react-router-dom'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='font-bold text-2xl mt-5 text-white text-center drop-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]'>Places to Visit</h2>
      <div className='flex justify-center mt-2'><div className='md:w-[5vw] md:hover:w-[7vw] transition-all w-[10vw] h-2 rounded-xl bg-white'></div></div>
      <div>
        {Object.values(trip?.tripData || {})[0]?.itinerary?.map((item, index)=>(
            <div key={index}>
                <h2 className='font-bold text-xl text-white p-5'>Day {item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5 border-3 border-[rgba(255,255,255,0.2)] p-10 rounded-2xl'>
                    {item.plan.map((place, index)=>(
                        <div  key={index} className='my-3 bg-[rgba(255,255,255,0.3)] p-5 rounded-2xl hover:scale-102 hover:shadow-md transition-all'>
                            <h2 className='font-medium text-sm text-blue-800'>{place.timeBlock}</h2>
                            <PlaceCardItem place={place} trip={trip} />
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>

  )
}

export default PlacesToVisit
