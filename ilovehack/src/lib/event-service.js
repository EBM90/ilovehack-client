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

  addEvent = async({ name, creator, description, location, cohort}) =>{
    try {
      const theEvent = await this.event.post(`/events/add-event`,{ name, creator, description, location, cohort})
      return theEvent.data
    } catch (error) {
      console.log(error)
    }
  }

  editEvent = async({id, name, date, location }) =>{
    try {
      const theEvent = await this.event.put(`/events/edit/${id}`, name, date, location)
      return theEvent.data
    } catch (error) {
      console.log(error)
    }
  }

  joinEvent = async(user_id, event_id ) =>{
    try {
      console.log(user_id, event_id)
      const theEvent = await this.event.post(`/events/fav`, {user_id, event_id})
      return theEvent.data
    } catch (error) {
      console.log(error)
    }
  }
}

const axiosRequestFunctions = new Event();

export default axiosRequestFunctions;
