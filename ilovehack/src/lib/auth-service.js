import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  signup({ fullname, password, birthdate, gender, email, description, answers, isHorny, searchFor }) {
    return this.auth
      .post("/signup", { fullname, password, birthdate, gender, email, description, answers, isHorny, searchFor })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  login({ email, password }) {
    return this.auth
      .post("/login", { email, password })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  logout() {
    return this.auth.post("/logout", {}).then(({ data }) => data);
    // return this.auth.post("/auth/logout", {}).then((response) => response.data);
  }

  me() {
    return this.auth.get("/me").then((response) => response.data);
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
