import { doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import { getDoc } from 'firebase/firestore';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {
  const {tripId}=useParams();
  const [trip, setTrip]=useState([]);
  useEffect(()=>{
    tripId&&GetTripData();
  }, [tripId]);
  /**
   * Used to get Trip Information from Firebase
   */
  const GetTripData = async()=>{
    const docRef=doc(db, 'AITrips', tripId);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
    }
    else{
        console.log("No Such Document");
        toast("No Trip Found!");
    }
  }
  return (
    <>
      <div className='p-10 md:px-20 lg:px-44 xl:px-56 bg-gray-600 flex justify-center pt-20'>
        {/*Information Section*/}
          <InfoSection trip={trip} />
      </div>
      <div className='p-10 md:px-20 lg:px-44 xl:px-56 pt-10 bg-gradient-to-b from-blue-500 via-green-400 to-pink-400'>
        {/*Recommended Hotels*/}
          <Hotels trip={trip} />
        {/*Daily Plan*/}
          <PlacesToVisit trip={trip} />
        {/*Footer*/}
          <Footer />
      </div>
    </>
  )
}

export default ViewTrip
