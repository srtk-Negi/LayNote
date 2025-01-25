import getLocation, { locationDataInterface } from "../utils/getLocation";
import { useState, useEffect } from "react";

const Home = () => {
  const [location, setLocation] = useState({} as locationDataInterface);

  const getCurrentLocation = async () => {
    try {
      const locationData = await getLocation();
      setLocation(locationData);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">Home</h1>
      <p className="text-2xl">Your location is:</p>
      <p className="text-xl">
        {location.city}, {location.loc}, {location.ip}
      </p>
    </div>
  );
};

export default Home;
