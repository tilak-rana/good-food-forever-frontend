import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/homepage.css";
import Banner from "./Homepage_banner";
import QuickSearch from "./Homepage_Quicksearch";

const Home = () => {
  const [location, setLocation] = useState([]);
  const [mealtypes, setMealtypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch location and mealtypes data
    const fetchData = async () => {
      try {
        const [locationRes, mealtypeRes] = await axios.all([
          axios.get(
            "https://good-food-forever-backend-2.onrender.com/location",
            {
              headers: { "Content-Type": "application/JSON" },
            }
          ),
          axios.get(
            "https://good-food-forever-backend-2.onrender.com/mealtype",
            {
              headers: { "Content-Type": "application/JSON" },
            }
          ),
        ]);

        setLocation(locationRes.data.loc);
        setMealtypes(mealtypeRes.data.mealtype);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only on mount

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Banner locationData={location} />
      <QuickSearch mealtypeData={mealtypes} />
    </div>
  );
};

export default Home;
