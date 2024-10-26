import { config } from "../config";

export const findlocationfromIP = async (ip: string) => {
  const response = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${config.IP_GEOLOCATION_API_KEY}&ip=${ip}`
  );
  return await response.json();
};
