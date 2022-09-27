import React, { Component } from "react";
import CocheDataService from "../services/coches.service";
import { withRouter } from '../common/with-router';

class Coche extends Component {
  constructor(props) {
    super(props);
    this.onChangeMake = this.onChangeMake.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCoche = this.getCoche.bind(this);
    this.updateCoche = this.updateCoche.bind(this);
    this.deleteCoche = this.deleteCoche.bind(this);

    this.state = {
      currentCoche: {
        id: null,
        Make: "",
        Model: "",
        description: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCoche(this.props.router.params.id);
  }

  onChangeMake(e) {
    const Make = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCoche: {
          ...prevState.currentCoche,
          Make: Make
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCoche: {
        ...prevState.currentCoche,
        description: description
      }
    }));
  }

  getCoche(id) {
    CocheDataService.get(id)
      .then(response => {
        this.setState({
          currentCoche: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCoche() {
    CocheDataService.update(
      this.state.currentCoche.id,
      this.state.currentCoche
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The car was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCoche() {    
    CocheDataService.delete(this.state.currentCoche.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/coches');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCoche } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Car</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Make</label>
                <input
                  type="text"
                  className="form-control"
                  id="Make"
                  value={currentCoche.Make}
                  onChange={this.onChangeMake}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="Model"
                  value={currentCoche.Model}
                  onChange={this.onChangeMake}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCoche.description}
                  onChange={this.onChangeDescription}
                />
              </div>


            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCoche}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCoche}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Car...</p>
          </div>
        )}
      </div>
    );

  }
}

export default withRouter(Tutorial);
