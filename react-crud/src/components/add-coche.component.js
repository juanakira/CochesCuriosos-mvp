import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddCoche extends Component {
  constructor(props) {
    super(props);
    this.onChangeMake = this.onChangeMake.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.saveCoche = this.saveCoche.bind(this);
    this.newCoche = this.newCoche.bind(this);

    this.state = {
      id: null,
      Make: "",
      Model: "",
      description: "", 

      submitted: false
    };
  }

  onChangeMake(e) {
    this.setState({
      Make: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeModel(e) {
    this.setState({
      Model: e.target.value
    });
  }

  saveCoche() {
    var data = {
      Make: this.state.Make,
      Model: this.state.Model,
      Notes: this.state.description
    };

    CocheDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          Make: response.data.Make,
          description: response.data.description,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCoche() {
    this.setState({
      id: null,
      Make: "",
      Model: "",
      Notes: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCoche}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Make</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.Make}
                onChange={this.onChangeMake}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                required
                value={this.state.description}
                onChange={this.onChangeModel}
                name="model"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Notes</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveCoche} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
