import axios from "axios";

class User {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  getUserDetails = async(id) => {
    try {
        const theUserDetails = await this.user.get(`/profile/${id}`)
        console.log(theUserDetails)
        return theUserDetails.data
    } catch (error) {
        console.log(error)
    }
  }

  getUser = async() => {
    try {
        const theUser = await this.user.get('/profile')
        return theUser.data
    } catch (error) {
        console.log(error)
    }
  }

  getQuestions = async() =>{
    try {
      const theQuestions = await this.user.get('/profile/questions')
      return theQuestions.data
    } catch (error) {
      console.log(error)
    }
  }

  getAnswers = async(answers) => {
    try {
      console.log(answers)
      const theAnswers = await this.user.post('/profile/answers', answers)
      return theAnswers.data
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

  getAllUsers = async() =>{
    try {
        const allOfThem = await this.user.get('/profile/allusers')
        return allOfThem.data
    } catch (error) {
      console.log(error)
    }
  }
}

const axiosRequestFunctions = new User();

export default axiosRequestFunctions;
