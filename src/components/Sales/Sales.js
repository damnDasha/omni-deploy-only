import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

export class Sales extends Component {
  render() {
    return (
      <div className="sales">
        <NavBar />
        all sales qas
        <Link to="/Dashboard">
          <button type="button">go back</button>
        </Link>
      </div>
    );
  }
}

export default Sales;
