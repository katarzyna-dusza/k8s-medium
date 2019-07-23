import React from "react";
import { Route } from "react-router-dom";
import Movies from "./movies";
import MovieDetails from "./movie-details";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Movies} />
        <Route path="/movies/:id" component={MovieDetails} />
      </div>
    );
  }
}
