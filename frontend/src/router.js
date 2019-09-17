import React from "react";
import { Route } from "react-router-dom";
import Movies from "./movies";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Movies} />
      </div>
    );
  }
}
