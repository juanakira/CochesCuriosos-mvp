import React, { Component } from "react";
import CocheDataService from "../services/coche.service";
import { Link } from "react-router-dom";

export default class CochesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchMake = this.onChangeSearchMake.bind(this);
    this.retrieveCoches = this.retrieveCoches.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCoche = this.setActiveCoche.bind(this);
    this.removeAllCoches = this.removeAllCoches.bind(this);
    this.searchMake = this.searchMake.bind(this);

    this.state = {
      coches: [],
      currentCoche: null,
      currentIndex: -1,
      searchMake: ""
    };
  }

  componentDidMount() {
    this.retrieveCoches();
  }

  onChangeSearchMake(e) {
    const searchMake = e.target.value;
    
    this.setState({
        searchMake: searchMake
    });
  }

  retrieveCoches() {
    CocheDataService.getAll()
      .then(response => {
        this.setState({
          coches: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCoches();
    this.setState({
      currentCoche: null,
      currentIndex: -1
    });
  }

  setActiveCoche(coche, index) {
    this.setState({
      currentCoche: coche,
      currentIndex: index
    });
  }

  removeAllCoches() {
    CocheDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchMake() {
    CocheDataService.findByMake(this.state.searchMake)
      .then(response => {
        this.setState({
          coches: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchMake, coches, currentCoche, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by make"
              value={searchMake}
              onChange={this.onChangeSearchMake}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchMake}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Cars List</h4>

          <ul className="list-group">
            {coches &&
              coches.map((coche, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCoche(coche, index)}
                  key={index}
                >
                  {coche.Make}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCoches}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCoche ? (
            <div>
              <h4>Car</h4>
              <div>
                <label>
                  <strong>Make:</strong>
                </label>{" "}
                {currentCoche.Make}
              </div>
              <div>
                <label>
                  <strong>Model:</strong>
                </label>{" "}
                {currentCoche.Model}
              </div>
              <div>
                <label>
                  <strong>Notes:</strong>
                </label>{" "}
                {currentCoche.Notes}
              </div>

              <Link
                to={"/coches/" + currentCoche.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Car...</p>
            </div>
          )}
        </div>
      </div>
    );

  
  }
}
