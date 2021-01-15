import axios from "axios";

class Event {
  constructor() {
    this.event = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true,
    });
  }

  getAllEvents = async() => {
    try {
        const all = await this.event.get('/events/all-events')
        return all.data
    } catch (error) {
        console.log(error)
    }
  }

  getTheEvent = async(id) => {
    try {
        const theEvent = await this.event.get(`/events/event-details/${id}`)
        return theEvent.data
    } catch (error) {
        console.log(error)
    }
  }

  addEvent = async({ name, creator, kind, imgPath, description, date, time, location, isAttending, cohort, isPublic}) =>{
    try {
      const theEvent = await this.event.post(`/events/add-event`,{ name, creator, kind, imgPath, description, date, time, location, isAttending, cohort, isPublic})
      console.log(kind)
      return theEvent.data
    } catch (error) {
      console.log(error)
    }
  }

  handleUpload = async (theFile) => {
    console.log("file in service: ", theFile);

    try {
      const res = await this.event.post("/events/uploadpicture", theFile);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  editEvent = async({id, name, imgPath, description, date, time, location, isAttending, cohort, isPublic}) =>{
    try {
      const theEvent = await this.event.put(`/events/edit/${id}`, {name, imgPath, description, date, time, location, isAttending, cohort, isPublic})
      return theEvent.data
    } catch (error) {
      console.log(error)
    }
  }

  handlePic = async (theFile) => {
    console.log("file in service: ", theFile);

    try {
      const res = await this.event.post("/events/upload", theFile);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  joinEvent = async(user_id, event_id ) =>{
    try {
      const theEvent = await this.event.post(`/events/fav`, {user_id, event_id})
      return theEvent.data
    } catch (error) {
      console.log(error)
    }
  }

  unJoinEvent = async (user_id, event_id ) =>{
    try {
      const theEvent = await this.event.put(`/events/fav`, {user_id, event_id})
      return theEvent.data
    } catch (error) {
      console.log(error)
    }
  }
}

const axiosRequestFunctions = new Event();

export default axiosRequestFunctions;
