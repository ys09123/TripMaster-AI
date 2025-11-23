# 🌍 TripMaster AI

TripMaster AI is an intelligent travel planning application that helps users generate personalized travel itineraries in seconds. By leveraging the power of AI, it curates custom trip plans including hotels, daily activities, and dining recommendations based on your preferences, budget, and travel companions.

## ✨ Features

-   **AI-Powered Itineraries**: Generate day-by-day travel plans for any destination in the world.
-   **Personalized Customization**: Tailor trips based on:
    -   📅 Number of Days
    -   💰 Budget (Cheap, Moderate, Luxury)
    -   👥 Group Size (Solo, Couple, Family, Friends)
-   **Hotel Recommendations**: Get curated lists of hotels with images, ratings, and locations.
-   **Daily Activities**: Detailed morning, afternoon, and evening plans for every day of your trip.
-   **Interactive UI**: Built with modern, responsive components for a seamless user experience.

## 🛠️ Tech Stack

-   **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
-   **AI Integration**: Google Gemini API (or OpenAI GPT)
-   **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

```bash
TripMaster-AI/
├── public/              # Public static assets
├── src/
│   ├── assets/          # Images and icons
│   ├── components/      # Reusable UI components (Header, Footer, Cards)
│   ├── constants/       # App constants (Options, Prompt templates)
│   ├── create-trip/     # Trip generation form and logic
│   ├── lib/             # Utility functions (shadcn utils)
│   ├── my-trip/         # Page to view user's saved trips
│   ├── service/         # API services (GlobalApi.js, AI Model config)
│   ├── view-trip/       # Detailed itinerary view page
│   ├── App.jsx          # Main Layout component
│   └── main.jsx         # Entry point and Route definitions
├── .env                 # Environment variables
├── components.json      # Shadcn/UI configuration
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

