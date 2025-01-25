export interface locationDataInterface {
  loc: string;
  city: string;
  region: string;
  country: string;
  ip: string;
}

const getLocation = async () => {
  const url = "https://ipinfo.io/json";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const locationData: locationDataInterface = data;
    const { loc, city, region, country, ip } = locationData;

    return {
      loc,
      city,
      region,
      country,
      ip,
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

export default getLocation;
