export const SelectTravelsList=[
    {
        id: 1,
        title: 'Solo',
        desc: 'A solo travelers in exploration',
        icon: './Travel_type/solo.png',
        people: '1'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'A romantic getaway for two',
        icon: './Travel_type/couple.png',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A fun-filled trip with the whole family',
        icon: './Travel_type/family.png',
        people: '3+'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'An adventure shared with friends',
        icon: './Travel_type/friends.png',
        people: '2+'
    }
]

export const SelectBudgetOptions=[
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💸'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balance comfort and cost',
        icon: '💰'
    },
    {
        id: 3,
        title: 'High',
        desc: 'Luxury without limits',
        icon: '💎'
    }
]

export const AI_PROMPT = "Generate Travel Plan for Location: {location}, from {startDate} to {endDate} for {traveller} travel with a {budget} budget, Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel valid referal image link, geo coordinates, rating, descriptions and suggest itinerary with place name, place Details, place valid referal image link, Geo Coordinates, ticket pricing(just prize only or free),timeblock(best timing to visit), speciality, Time to travel each of the location in JSON format."