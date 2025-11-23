// CreateTrip.jsx
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from "sonner"
import chatSession from '../service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { BiLoaderAlt } from "react-icons/bi";
import { db } from '../service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  // Function to fetch place suggestions from OpenStreetMap Nominatim API
  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        inputValue
      )}&addressdetails=1&limit=5`
    )
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((place) => ({
          label: place.display_name,
          value: {
            lat: place.lat,
            lon: place.lon,
            display_name: place.display_name,
          },
        }));
        callback(options);
      })
      .catch(() => callback([]));
  };

  const handleChange = (selectedOption) => {
    console.log('Selected place:', selectedOption);
  };

  //For Form Data
  const [formData, setFromData]=useState([]);
  const [openDialog, setOpenDialog]=useState(false);
  const [loading, setLoading]=useState(false);
  const [place, setPlace]=useState("");
  const navigate=useNavigate();
  const handleInputChange=(name, value)=>{
    // if(name=='noOfDays'&&value>5){
    //   console.log("Please enter trip days less than 5");
    //   return;
    // }
    setFromData({
      ...formData,
      [name]:value
    })
  }

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      GetUserProfile(tokenInfo);
    },
    onError: (error) => console.log(error)
  });


  const OnGenerateTrip=async ()=>{
    const user=sessionStorage.getItem('user');
    if(!user){
      setOpenDialog(true);
    }

    if(!formData?.location||!formData?.budget||!formData?.traveller){
      toast("Please fill all the details!");
      return;
    }
    console.log(formData);
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location.label)
    .replace('{startDate}', fromDate)
    .replace('{endDate}', toDate)
    .replace('{traveller}', formData?.traveller)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays);
    console.log(FINAL_PROMPT);
    const res=await chatSession(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(res);
    console.log(res);
    
  }
  
  
  const SaveAiTrip = async(TripData) => {
    // Add a new document in collection "cities"
    setLoading(true);
    const user=JSON.parse(sessionStorage.getItem('user'));
    const docId=Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userData: formData,
      tripData: JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json'
      }
    })
    .then((resp) => {
      console.log("Token Info:", tokenInfo);
      console.log('User Info:', resp.data);
      sessionStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
    .catch((error) => {
      console.error('Error fetching user profile:', error.response?.data || error.message);
    });
  };

  {/** For start and end date */}
  const today = new Date().toISOString().split('T')[0];

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (e) => {
    const selected = e.target.value;
    setFromDate(selected);

    // If current "to" date is before new "from", reset it
    if (toDate && toDate <= selected) {
      setToDate('');
    }
  };

  const getNextDay = (date) => {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return next.toISOString().split('T')[0];
  };

  return (
    <div
      style={{ backgroundImage: "url('/trip-plan-bg.jpg')" }}
      className="w-full h-full sm:px-10 md:px-32 lg:px-56 xl:px-10 p-5 pt-20 bg-cover bg-center"
    >
      <h2 className="font-bold text-4xl text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] text-center">
        Tell us your travel preferences
      </h2>
      <p className="mt-3 text-gray-200 text-md drop-shadow-[1px_1px_3px_rgba(0,0,0,0.9)] text-center">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary.
      </p>


      {/**Destination */}
      <div className="mt-15 p-10 w-[90vw] rounded-b-3xl bg-[rgba(0,0,0,0.6)]">
        <h2 className="text-xl my-3 font-medium text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.6)]">
          What is your destination of choice?
        </h2>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onChange={(v) => {
            handleInputChange("location", v);
          }}
          placeholder="Search destination..."
          defaultOptions={false}
          isClearable
          className='hover:cursor-pointer hover:border-black border-2 rounded-sm'
        />
      </div>


      {/**Travel Date */}
      <div className="mt-10 p-10 w-[90vw] rounded-b-3xl bg-[rgba(0,0,0,0.6)]">
        <h2 className="text-xl my-3 font-medium text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.6)]">
          Select Travel Dates:
        </h2>
        {/*<Input 
          placeholder={'Ex. 3'} 
          type="number" 
          onChange={(e)=>handleInputChange('noOfDays', e.target.value)}
        /> */}
        <div className="flex flex-col">
          <label className="text-white text-md mb-1 font-medium drop-shadow-[1px_1px_1px_rgba(0,0,0,0.9)]">
            From
          </label>
          <input
            type="date"
            min={today}
            value={fromDate}
            onChange={handleFromDateChange}
            className="px-3 py-2 rounded-md text-gray-800 bg-white cursor-pointer hover:border-black border-2"
          />
        </div>

        <div className="flex flex-col mt-2">
          <label className="text-white text-md mb-1 font-medium drop-shadow-[1px_1px_1px_rgba(0,0,0,0.9)]">
            To
          </label>
          <input
            type="date"
            min={fromDate ? getNextDay(fromDate) : today}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 rounded-md text-gray-800 bg-white cursor-pointer hover:border-black border-2"
          />
        </div>
      </div>

      {/**Budget */}
      <div className="mt-10 p-10 w-[90vw] rounded-b-3xl bg-[rgba(0,0,0,0.6)]">
        <h2 className="text-xl my-3 font-medium text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.6)]">
          What is your budget?{" "}
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border-3 text-center rounded-lg hover:shadow-lg hover:cursor-pointer bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.9)] hover:scale-101 ${
                formData?.budget === item.title && "shadow-lg border-yellow-300"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg text-white">{item.title}</h2>
              <h2 className="text-sm text-gray-300">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/**Traveler */}
      <div className="mt-10 p-10 w-[90vw] rounded-b-3xl bg-[rgba(0,0,0,0.6)]">
        <h2 className="text-xl my-3 font-medium text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.6)]">
          What kind of traveler are you this time?
        </h2>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveller", item.title)}
              className={`p-4 border-3 text-center rounded-lg hover:shadow-lg hover:cursor-pointer bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.9)] hover:scale-101 ${
                formData?.traveller == item.title &&
                "shadow-lg border-yellow-300"
              }`}
            >
              <div className='flex justify-center'><img className="text-4xl w-30" src={item.icon}/></div>
              <h2 className="font-bold text-lg text-white">{item.title}</h2>
              <h2 className="text-sm text-gray-300">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/**Generate Button */}
      <div className="my-10 flex justify-center">
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
          className={`mt-6 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 
                ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "p-6 bg-black text-white border-2 border-white hover:bg-white hover:text-black hover:border-black hover:shadow-xl cursor-pointer"
                }`}
        >
          {loading ? (
            <BiLoaderAlt className="h-6 w-6 animate-spin mx-auto" />
          ) : (
            "✨ Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogDescription>
              <img src="./logo1.png" alt="Logo" className="w-28 mx-auto mb-5" />
              <h2 className="font-bold text-lg text-center">
                Sign In With Google
              </h2>
              <p className="text-sm mb-4 text-center">
                Securely log in to the app using your Google account.
              </p>
              <Button
                onClick={login}
                className="w-full flex items-center justify-center gap-3 bg-black text-white hover:bg-gray-700 rounded-xl cursor-pointer"
              >
                <FcGoogle className="text-xl" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* Footer */}
            <footer className="relative z-10 mt-20 text-white text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} TripMaster AI | All rights are reserved | Created by Yash.</p>
            </footer>
    </div>
  );
}

export default CreateTrip;
