import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  signup({ fullname, password, birthdate, gender, email, description, answers, isHorny, searchFor }) {
    const formValid = ({ isError, ...rest }) => {
      let isValid = false;
  
      Object.values(isError).forEach(val => {
          if (val.length > 0) {
              isValid = false
          } else {
              isValid = true
          }
      });
  
      Object.values(rest).forEach(val => {
          if (val === null) {
              isValid = false
          } else {
              isValid = true
          }
      });
  
      return isValid;
  };


    return this.auth
      .post("/auth/signup", { fullname, password, birthdate, gender, email, description, answers, isHorny, searchFor })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  login({ email, password }) {
    return this.auth
      .post("/auth/login", { email, password })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
    // return this.auth.post("/auth/logout", {}).then((response) => response.data);
  }

  me() {
    return this.auth.get("/auth/me").then((response) => response.data);
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
