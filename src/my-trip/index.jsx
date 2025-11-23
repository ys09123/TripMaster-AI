import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrip() {
    const navigate=useNavigate();
    const [userTrips, setUserTrips]=useState([]);
    useEffect(()=>{
        GetUserTrips();
    }, [])

    /**
     * Use to get all user trips
     * @returns 
     */
    const GetUserTrips=async()=>{
       
        const user=JSON.parse(sessionStorage.getItem('user'));
        if(!user){
            navigate('/');
            return;
        }
        try {
            const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
            const querySnapshot = await getDocs(q);

            const trips = [];
            querySnapshot.forEach((doc) => {
                trips.push(doc.data());
            });
            console.log(trips);

            setUserTrips(trips); // Set state only once with all trips
        } catch (error) {
            console.error('Error fetching trips:', error);
        }

    }
    return (
    <div className="relative w-full min-h-screen pb-15">
        {/* Background Image with Dark Overlay */}
        <div
        style={{ backgroundImage: "url('/my-trip-bg.jpg')" }}
        className="absolute inset-0 bg-cover bg-center z-0"
        >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-5 px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10">
        <h2 className="font-bold text-3xl text-center pt-20 text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)]">
            My Trips
        </h2>
        <div className="flex justify-center">
            <div className="mt-3 md:w-[5vw] w-[20vw] h-2 bg-white rounded-2xl hover:w-[7vw] transition-all duration-300"></div>
        </div>

        <div className="grid grid-cols-1 justify-items-center md:justify-items-start md:grid-cols-4 gap-5 mt-10">
            {userTrips.map((trip, index) => (
            <UserTripCardItem key={index} trip={trip} />
            ))}
        </div>
        </div>
        {/* Footer */}
            <footer className="relative z-10 mt-20 text-white text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} TripMaster AI | All Rights Reserved | Created by Yash.</p>
            </footer>
    </div>
    );

}

export default MyTrip
