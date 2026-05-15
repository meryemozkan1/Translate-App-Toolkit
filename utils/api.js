import axios from "axios";

const api = axios.create({
  // Sadece ana adres
  baseURL: "https://openl-translate.p.rapidapi.com", 
  headers: {
    "x-rapidapi-key": "41f4b3175emshc60b87d916dc889p17880ejsna8334502f3ff", 
    "x-rapidapi-host": "openl-translate.p.rapidapi.com",
  },
});

export default api;