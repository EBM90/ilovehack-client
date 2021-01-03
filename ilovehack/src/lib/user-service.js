import axios from "axios";

class User {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  getUser = async() => {
    try {
        const theUser = await this.user.get('/profile')
        return theUser.data
    } catch (error) {
        console.log(error)
    }
  }

  handleUpload = async (theFile) => {
    console.log("file in service: ", theFile);

    try {
      const res = await this.user.post("/profile/uploadpicture", theFile);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  editUser = async({fullname, email, description, imgPath}) => {
    try {
        const newUser = await this.user.put(`/profile/edit`, {fullname, email, description, imgPath})
        return newUser.data
    } catch (error) {
        console.log(error)
    }
  }
}

const axiosRequestFunctions = new User();

export default axiosRequestFunctions;
