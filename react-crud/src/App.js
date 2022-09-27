import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/coches" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/coches"} className="nav-link">
                Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CochesList/>} />
            <Route path="/coches" element={<CochesList/>} />
            <Route path="/add" element={<AddCoche/>} />
            <Route path="/coches/:id" element={<Coche/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;