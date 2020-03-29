import axios from "axios";

export default axios.create({
    baseURL: "https://net-group-back.herokuapp.com/api/v1",
    responseType: "json"
});