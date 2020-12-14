const prod = {
  apiUrl: "https://server-to-do-list.herokuapp.com/",
};

const dev = {
  apiUrl: "http://localhost:3004/",
};
const config = process.env.NODE_ENV === "development" ? dev : prod;
export const forcedLogOut = "authorization/forcedLogOut";
export default config 
