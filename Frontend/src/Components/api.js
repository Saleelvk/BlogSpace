import axios from "axios";
const api = axios.create({
  baseURL: "https://blogspace-jh9a.onrender.com/api/v1", // Updated to deployed URL
}); 

const imgUrl = "https://blogspace-jh9a.onrender.com"; // Updated image base URL
export { api, imgUrl };
