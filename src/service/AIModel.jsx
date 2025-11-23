// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

// In a real application, import.meta.env.GOOGLE_GEMINI_API_KEY
// would be available if you're using a bundler like Vite or Create React App.
// For a Node.js backend, you'd typically use process.env.GOOGLE_GEMINI_API_KEY
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

/**
 * Initiates a chat session with the Google Gemini model to generate travel plans.
 *
 * @param {string} prompt The user's prompt or question.
 * @param {Array<Object>} [history=[]] An optional array of previous messages
 * to maintain conversation context. Each message should be an object with
 * 'role' ('user' or 'model') and 'parts' (an array of text objects).
 * @returns {Promise<string>} A promise that resolves to the model's generated response (JSON string).
 */
const chatSession = async(prompt, history = []) => {
  if (!apiKey) {
    throw new Error("GOOGLE_GEMINI_API_KEY is not defined. Please ensure it's set in your environment variables.");
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });

  const config = {
    responseMimeType: 'application/json',
  };

  const model = 'gemini-2.5-flash-preview-05-20';

  // The initial content provided to "train" the model on the desired output format.
  // This helps ensure the model consistently returns JSON for travel plans.
  const initialConversation = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place name, place Details, place Image Url, Geo Coordinates, ticket pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Devising a Budget Plan**

I'm now focusing on curating affordable hotel options in Las Vegas. Researching pricing trends for the area to meet the budget constraints is the current focus. I aim to create a list with hotel names, addresses, and budget-friendly prices. Once the hotel options are complete, I will create a 3-day itinerary.


**Formulating Hotel Options**

I've shifted my focus to the hotel options, starting to gather data and establish a baseline for "cheap" in Vegas. I'm currently researching various hotel attributes like images and descriptions to enrich the initial list, and then I'll finalize the pricing to fit the budget.


**Defining Affordable Hotels**

I'm now focusing on a more granular breakdown of potential hotel options. My approach involves categorizing hotels based on location and price range. I will incorporate a "price anchoring" technique, using a basic cost baseline to filter and compare choices. My primary objective is to create a list of hotels that fit the target budget.


**Constructing the Itinerary**

I'm now integrating the hotel options and itinerary. I've curated hotel names, addresses, ratings, and placeholder images, and am finalizing prices within the "cheap" range. My focus has shifted to crafting a detailed 3-day itinerary, including free or low-cost activities and travel times, all under a strict budget.


**Developing a Detailed Plan**

I'm now focusing on curating the 3-day itinerary, populating details for activities like their locations and brief descriptions. I will also incorporate transportation times and create estimated costs, aiming to keep the trip as affordable as possible. I've also begun to integrate my research on specific free and low-cost things to do, and I'll use those ideas to refine the itinerary.


**Formulating the Travel Plan**

I'm now integrating the itinerary and researching specific activities for each day within Las Vegas. I'm focusing on free attractions and budgeting for food and transportation. I've compiled several potential hotel options and am determining a price range within the "cheap" category, considering factors like location and amenities. I will finalize the plan in JSON format.


**Crafting a Travel Plan**

I've finalized the itinerary structure and identified key locations for each day, with the framework in place. Now I'm focusing on populating the plan with specific activities and budget-friendly options, integrating the JSON format. The current focus is on building the structure of the itinerary, including time blocks and details for each day.


**Formulating a Plan**

I'm now fully immersed in developing the detailed JSON structure, focusing on a framework with hotels, activities, and budget estimates. My current challenge is to find the right balance between detailed information and concise planning. I've begun to fill out each day's plan within the JSON with placeholder URLs and details on time blocks and estimated costs. I will soon complete the overall budget for the entire trip.


**Refining Itinerary Details**

I'm now integrating estimated prices for activities and transportation into the JSON structure. I'm focusing on ensuring accurate and affordable cost estimates for each day to create a realistic budget-conscious travel plan. In addition, I will create clear descriptions of activities for each day to inform the user.


**Structuring the Data**

I've completed the hotel and itinerary data structures in JSON format, incorporating hotel details, including names, addresses, and price ranges. I'm now crafting a detailed 3-day itinerary, including descriptions for each day and activity. I'm also incorporating the user's details for easy readability. I'm integrating the transportation and budget considerations to make sure it is accurate.


**Integrating the Data**

I've now incorporated the essential hotel data, including names, addresses, price estimates, descriptions, and placeholder images. My focus is on refining the budget estimates for each activity. I'll focus on the data for each day to make it more coherent. I'm prioritizing accuracy for activities in the plan to make the plan more useful.


**Structuring the JSON**

I've initiated the population of the JSON structure. I'm focusing on defining the essential components for the travel plan, beginning with hotel options and itinerary details. The challenge is ensuring it's concise, yet comprehensive, with accurate budget estimates. Placeholders for image URLs have been set, and I'm currently refining the initial activity and pricing estimates. The budget notes will then be added to the notes section of the travel plan.


`,
        },
        {
          text: `\`\`\`json
{
  "lasVegasTravelPlan": {
    "location": "Las Vegas, Nevada, USA",
    "durationDays": 3,
    "travelers": "Couple",
    "budget": "Cheap (estimated $700 - $1200 for 3 days, excluding flights, but highly variable)",
    "notes": "This plan focuses on maximizing free and low-cost activities, transportation, and dining options to keep within a cheap budget. Prices are estimates and can vary significantly based on season, demand, and specific dates. Public transportation (The Deuce bus and Downtown Loop shuttle) is highly recommended for economical travel. Bring comfortable walking shoes!",
    "hotelOptions": [
      {
        "hotelName": "OYO Hotel & Casino Las Vegas",
        "hotelAddress": "150 E Harmon Ave, Las Vegas, NV 89109",
        "pricePerNightEstimate": "$40 - $100 (plus resort fees ~$30-40/night)",
        "hotelImageUrl": "https://example.com/oyo_hotel_las_vegas.jpg",
        "geoCoordinates": {
          "latitude": 36.1070,
          "longitude": -115.1691
        },
        "rating": "3.0/5",
        "description": "A budget-friendly option located just off the Strip, behind the MGM Grand. It offers basic rooms and amenities, a casino, and a few dining spots. Good for travelers prioritizing location proximity to the Strip without the high price tag."
      },
      {
        "hotelName": "Ellis Island Hotel, Casino & Brewery",
        "hotelAddress": "4178 Koval Ln, Las Vegas, NV 89109",
        "pricePerNightEstimate": "$60 - $120 (plus resort fees ~$20-30/night)",
        "hotelImageUrl": "https://example.com/ellis_island_las_vegas.jpg",
        "geoCoordinates": {
          "latitude": 36.1118,
          "longitude": -115.1610
        },
        "rating": "4.0/5",
        "description": "A popular local's spot known for its value, great food specials (especially their steak dinner!), and a microbrewery. It's a short walk from the Strip (Flamingo/Harrah's area) offering a more authentic, less touristy experience at a low price point."
      },
      {
        "hotelName": "Four Queens Hotel & Casino (Downtown Las Vegas)",
        "hotelAddress": "202 Fremont St, Las Vegas, NV 89101",
        "pricePerNightEstimate": "$50 - $110 (plus resort fees ~$20-30/night)",
        "hotelImageUrl": "https://example.com/four_queens_las_vegas.jpg",
        "geoCoordinates": {
          "latitude": 36.1706,
          "longitude": -115.1423
        },
        "rating": "3.5/5",
        "description": "Located directly on the Fremont Street Experience in Downtown Las Vegas, this hotel offers classic Las Vegas charm at an affordable price. It's perfect for those who want to experience the vibrant energy of downtown and be steps away from free entertainment."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "Arrival & South/Mid-Strip Wonders",
        "plan": [
          {
            "timeBlock": "Morning (Arrival & Check-in)",
            "activity": "Arrive in Las Vegas & Check into Hotel",
            "details": "Fly into McCarran International Airport (LAS). For budget transportation, consider the RTC public bus (Route 108 or 109 to Tropicana Ave then walk/transfer), or a shared-ride shuttle service (e.g., Go Shuttle). Settle into your hotel.",
            "placeName": "McCarran International Airport (LAS)",
            "placeImageUrl": "https://example.com/las_vegas_airport.jpg",
            "geoCoordinates": {
              "latitude": 36.0840,
              "longitude": -115.1537
            },
            "ticketPricing": "Varies by transport (e.g., RTC bus $6 for 2-hour pass, shared shuttle ~$15-20 per person)",
            "timeToTravel": "2 hours"
          },
          {
            "timeBlock": "Afternoon (South Strip Exploration)",
            "activity": "Explore Luxor & Excalibur (Walk-through)",
            "details": "Walk through the iconic Luxor pyramid and then head over to the medieval-themed Excalibur. Enjoy the unique architecture and atmosphere. Both have budget-friendly food court options for a quick lunch.",
            "placeName": "Luxor Hotel & Casino / Excalibur Hotel & Casino",
            "placeImageUrl": "https://example.com/luxor_excalibur.jpg",
            "geoCoordinates": {
              "latitude": 36.0964,
              "longitude": -115.1764
            },
            "ticketPricing": "Free (walking through, food extra: ~$10-15 per person for lunch)",
            "timeToTravel": "2 hours",
            "bestTimeToVisit": "Any time, but daytime allows better views of architecture."
          },
          {
            "timeBlock": "Late Afternoon (Mid-Strip Freebies)",
            "activity": "Bellagio Fountains & Conservatory",
            "details": "Take The Deuce bus northbound. Witness the mesmerizing Bellagio Fountains show (runs every 15-30 minutes). Afterward, immerse yourselves in the stunning, ever-changing floral displays at the Bellagio Conservatory & Botanical Garden.",
            "placeName": "Bellagio Fountains & Conservatory",
            "placeImageUrl": "https://example.com/bellagio_fountains_conservatory.jpg",
            "geoCoordinates": {
              "latitude": 36.1128,
              "longitude": -115.1767
            },
            "ticketPricing": "Free",
            "timeToTravel": "2 hours",
            "bestTimeToVisit": "Fountains are spectacular at dusk/night, Conservatory is beautiful any time."
          },
          {
            "timeBlock": "Evening (LINQ Promenade & Budget Dinner)",
            "activity": "LINQ Promenade & Dinner",
            "details": "Walk or take a short Deuce ride to the LINQ Promenade. Enjoy the lively atmosphere, street performers, and window shop. For dinner, look for happy hour deals, or budget-friendly options like In-N-Out Burger, or a casual eatery within the Promenade.",
            "placeName": "The LINQ Promenade",
            "placeImageUrl": "https://example.com/linq_promenade.jpg",
            "geoCoordinates": {
              "latitude": 36.1179,
              "longitude": -115.1717
            },
            "ticketPricing": "Food cost (Varies, ~$15-25 per person for dinner)",
            "timeToTravel": "2-3 hours",
            "bestTimeToVisit": "Evening for vibrant atmosphere and entertainment."
          }
        ]
      },
      {
        "day": 2,
        "theme": "Iconic Photo Ops & Downtown Delights",
        "plan": [
          {
            "timeBlock": "Morning (Iconic Photo & Southern Strip)",
            "activity": "Welcome to Fabulous Las Vegas Sign & M&M's World/Coca-Cola Store",
            "details": "Take The Deuce bus south to the iconic 'Welcome to Fabulous Las Vegas' sign for a classic photo op. Afterwards, head back north to the area near MGM Grand and explore M&M's World and the Coca-Cola Store for free Browse and fun photo opportunities.",
            "placeName": "Welcome to Fabulous Las Vegas Sign & M&M's World/Coca-Cola Store",
            "placeImageUrl": "https://example.com/las_vegas_sign_mms.jpg",
            "geoCoordinates": {
              "latitude": 36.0821,
              "longitude": -115.1729
            },
            "ticketPricing": "Free (souvenirs extra)",
            "timeToTravel": "2 hours",
            "bestTimeToVisit": "Morning for less crowd at the sign, stores are good any time."
          },
          {
            "timeBlock": "Midday (North Strip Grandeur)",
            "activity": "The Venetian Resort Exploration",
            "details": "Take The Deuce bus north to The Venetian. Marvel at the stunning replica canals, architecture, and the Grand Canal Shoppes. Enjoy the atmosphere and performances by gondoliers (free to watch). Grab a quick, budget-friendly lunch at the food court.",
            "placeName": "The Venetian Resort & Grand Canal Shoppes",
            "placeImageUrl": "https://example.com/venetian_las_vegas.jpg",
            "geoCoordinates": {
              "latitude": 36.1203,
              "longitude": -115.1706
            },
            "ticketPricing": "Free (food extra: ~$15-20 per person for lunch)",
            "timeToTravel": "2 hours",
            "bestTimeToVisit": "Daytime for natural light, but evening has a romantic glow."
          },
          {
            "timeBlock": "Afternoon (Downtown Arts & Culture)",
            "activity": "Arts District & Downtown Container Park",
            "details": "From the Strip, take The Deuce bus or Downtown Loop shuttle to the Las Vegas Arts District (18b). Explore colorful murals and unique boutiques. Then, head to the Downtown Container Park, an open-air shopping and entertainment complex made from shipping containers.",
            "placeName": "Arts District & Downtown Container Park",
            "placeImageUrl": "https://example.com/downtown_container_park.jpg",
            "geoCoordinates": {
              "latitude": 36.1685,
              "longitude": -115.1413
            },
            "ticketPricing": "Free (shopping/food extra)",
            "timeToTravel": "2.5 hours",
            "bestTimeToVisit": "Afternoon for shopping and exploring, before evening crowds."
          },
          {
            "timeBlock": "Evening (Fremont Street Experience)",
            "activity": "Fremont Street Experience",
            "details": "Immerse yourselves in the vibrant energy of Fremont Street. Enjoy the dazzling Viva Vision light show canopy, live music on multiple stages (free concerts), street performers, and people-watching. Grab a budget dinner from a street vendor or a casual restaurant.",
            "placeName": "Fremont Street Experience",
            "placeImageUrl": "https://example.com/fremont_street_experience.jpg",
            "geoCoordinates": {
              "latitude": 36.1706,
              "longitude": -115.1423
            },
            "ticketPricing": "Free (food/drinks extra: ~$20-30 per person for dinner)",
            "timeToTravel": "3-4 hours",
            "bestTimeToVisit": "Evening for the light shows and live music."
          }
        ]
      },
      {
        "day": 3,
        "theme": "Retro Fun & Departure",
        "plan": [
          {
            "timeBlock": "Morning (Retro Fun)",
            "activity": "Pinball Hall of Fame",
            "details": "Take a short ride-share or RTC bus to the Pinball Hall of Fame. It's a non-profit museum with hundreds of classic and modern pinball machines. It's an affordable and fun way to spend a few hours, just pay for the games you play!",
            "placeName": "Pinball Hall of Fame",
            "placeImageUrl": "https://example.com/pinball_hall_of_fame.jpg",
            "geoCoordinates": {
              "latitude": 36.1039,
              "longitude": -115.1614
            },
            "ticketPricing": "Free entry (games are ~$0.25 - $1 per play, estimated $10-15 per person)",
            "timeToTravel": "2 hours",
            "bestTimeToVisit": "Morning for fewer crowds."
          },
          {
            "timeBlock": "Late Morning/Midday (Chill & Last Bites)",
            "activity": "Explore 'The Park' & Lunch",
            "details": "Head to 'The Park' located between New York-New York and Park MGM. This outdoor dining and entertainment district offers a pleasant, green space to relax. Find a casual spot for lunch or grab something from a nearby food court (e.g., New York-New York or Park MGM).",
            "placeName": "The Park Las Vegas",
            "placeImageUrl": "https://example.com/the_park_las_vegas.jpg",
            "geoCoordinates": {
              "latitude": 36.1072,
              "longitude": -115.1747
            },
            "ticketPricing": "Free (food extra: ~$15-20 per person for lunch)",
            "timeToTravel": "1.5 hours",
            "bestTimeToVisit": "Midday to early afternoon for a relaxed lunch."
          },
          {
            "timeBlock": "Afternoon (Souvenirs & Departure Prep)",
            "activity": "Souvenir Shopping & Final Packing",
            "details": "Spend your last hours picking up affordable souvenirs from shops on the Strip (e.g., Walgreens, CVS have cheap Vegas-themed items) or your hotel's gift shop. Head back to your hotel to finish packing and prepare for departure.",
            "placeName": "Various souvenir shops on The Strip",
            "placeImageUrl": "https://example.com/las_vegas_souvenirs.jpg",
            "geoCoordinates": {
              "latitude": 36.1150,
              "longitude": -115.1750
            },
            "ticketPricing": "Varies by purchase",
            "timeToTravel": "1.5 hours",
            "bestTimeToVisit": "Afternoon."
          },
          {
            "timeBlock": "Late Afternoon (Departure)",
            "activity": "Depart Las Vegas",
            "details": "Take your pre-booked shared shuttle, public bus, or ride-share to McCarran International Airport for your flight home.",
            "placeName": "McCarran International Airport (LAS)",
            "placeImageUrl": "https://example.com/las_vegas_departure.jpg",
            "geoCoordinates": {
              "latitude": 36.0840,
              "longitude": -115.1537
            },
            "ticketPricing": "Varies by transport",
            "timeToTravel": "1.5 hours"
          }
        ]
      }
    ]
  }
}
\`\`\``,
        },
      ],
    },
  ];

  // Combine the initial conversation with the provided history and the new user prompt.
  const contents = [
    ...initialConversation,
    ...history, // Add previous chat history
    {
      role: 'user',
      parts: [
        {
          text: prompt, // Use the dynamic prompt
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = '';
  for await (const chunk of response) {
    fullResponse += chunk.text;
  }

  return fullResponse; // Return the complete response string
}

export default chatSession;