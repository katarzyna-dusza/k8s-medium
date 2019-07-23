import React from "react";
import { Link } from "react-router-dom";
import { getAll, deleteMovie } from "./service";
import MovieCreate from "./movie-create";

class Movies extends React.Component {
  state = {
    movies: []
  };

  async componentDidMount() {
    const res = await getAll();

    this.setState({
      movies: res.data
    });
  }

  deleteMovie = async id => {
    const res = await deleteMovie(id);
    if (200 === res.status) {
      const movies = this.state.movies.filter(u => u._id !== id);

      this.setState({
        movies
      });
    }
  };

  addNewMovie = movie => {
    this.setState({
      movies: [...this.state.movies, movie]
    });
  };

  render() {
    const displayMovies = this.state.movies.map((m, i) => (
      <div key={i} className="cell">
        <div className="cell__value">
          <Link to={"/movies/" + m._id}>{m.title}</Link>
        </div>
        <div className="cell__value">{m.genres}</div>
        <div className="cell__value">{m.rate}</div>
        <div
          className="cell__value cell__value--remove"
          onClick={() => this.deleteMovie(m._id)}
        >
          X
        </div>
      </div>
    ));

    return (
      <div>
        <MovieCreate addNewMovie={this.addNewMovie} />
        <div className="section">
          <div className="section__title">Movies</div>
          <div className="section__row">
            <div className="column-name">Title</div>
            <div className="column-name">Genres</div>
            <div className="column-name">Rate</div>
            <div className="column-name">Remove</div>
          </div>
          {displayMovies}
        </div>
      </div>
    );
  }
}

export default Movies;
