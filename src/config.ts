export const config = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/express-mongo",
  PORT: process.env.PORT || 3000,
  IP_GEOLOCATION_API_KEY: process.env.IP_GEOLOCATION_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
};
