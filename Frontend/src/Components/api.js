import axios from "axios";
const api = axios.create({
  baseURL: "https://blogspace-jh9a.onrender.com/api/v1", 
}); 

const imgUrl = "https://blogspace-jh9a.onrender.com"; 
export { api, imgUrl };
