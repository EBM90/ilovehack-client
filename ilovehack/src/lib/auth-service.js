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
      .post("/auth/signup", { fullname, password, birthdate, gender, email, description, answers, isHorny, searchFor })
      .then(({ data }) => data);
  }

  login({ email, password }) {
    return this.auth
      .post("/auth/login", { email, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
  }

  me() {
    return this.auth.get("/auth/me").then((response) => response.data);
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
