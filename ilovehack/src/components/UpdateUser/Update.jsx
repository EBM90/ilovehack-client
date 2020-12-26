import React, { Component } from "react";
import userservice from "../../lib/user-service";

class UpdateUser extends Component {
  state = {
    user: ""
  };

  editUser = async () => {
    let res = await userservice.editUser(this.props.match.params.id);
    this.setState({ user: res.user})
}

componentDidMount = () => {
    this.editUser();
}

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userservice.updatedUser(this.state, this.props.match.params.id);
      this.setState({
        user: "",
       
      });

    } catch (error) {
      console.log("Error", error);
    }
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Update User</h2>
          <label htmlFor="">Name</label>
          <input type="text" name="user" value={this.state.user} placeholder={this.state.user} onChange={(e) => this.handleChange(e)}/>

          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default UpdateUser;