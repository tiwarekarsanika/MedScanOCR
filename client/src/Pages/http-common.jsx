import axios from "axios";

export default axios.create({

  
  baseURL: "http://localhost:8000/upload/65ba595cc1eb24b3b0715082",
  headers: {
    "Content-type": "application/json",
  },
});
