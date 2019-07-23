import React from "react";
import { create, update } from "./service";

class MovieCreate extends React.Component {
  state = {
    title: "",
    genres: "",
    cast: "",
    rate: 0,
    runtime: 0
  };

  handleChange = event => {
    const dataType = event.target.getAttribute("data-type");
    this.setState({
      [dataType]: event.target.value
    });
  };

  handleSubmit = async event => {
    const movie = {
      title: this.state.title,
      genres: this.state.genres,
      cast: this.state.cast,
      rate: this.state.rate,
      runtime: this.state.runtime
    };

    const newMovie = await create(movie);

    if (200 === newMovie.status) {
      this.props.addNewMovie(newMovie.data.result.data);
    }
  };

  render() {
    return (
      <div className="section">
        <div className="section__title">New movie</div>
        <div className="section__row">
          <label>Title:</label>
          <input
            type="text"
            data-type="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="section__row">
          <label>Genres:</label>
          <input
            type="text"
            data-type="genres"
            value={this.state.genres}
            onChange={this.handleChange}
          />
        </div>
        <div className="section__row">
          <label>Cast:</label>
          <input
            type="text"
            data-type="cast"
            value={this.state.cast}
            onChange={this.handleChange}
          />
        </div>
        <div className="section__row">
          <label>Rate:</label>
          <input
            type="text"
            data-type="rate"
            value={this.state.rate}
            onChange={this.handleChange}
          />
        </div>
        <div className="section__row">
          <label>Runtime:</label>
          <input
            type="text"
            data-type="runtime"
            value={this.state.runtime}
            onChange={this.handleChange}
          />
        </div>
        <div className="section__row section__row--button">
          <div className="button" onClick={this.handleSubmit}>
            Send
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCreate;
