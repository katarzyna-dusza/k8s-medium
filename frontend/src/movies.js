import React from "react";
import { getAll, deleteMovie, create } from "./service";
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

  addNewMovie = async movie => {
    const newMovie = await create(movie);

    if (200 === newMovie.status) {
      this.setState({
        movies: [
          ...this.state.movies,
          {...movie, _id: newMovie.data}
        ]
      });
    }
  };

  render() {
    const displayMovies = this.state.movies.map((m, i) => (
      <div key={i} className="cell">
        <div className="cell__value">{m.title ? m.title : '-'}</div>
        <div className="cell__value">{m.genres ? m.genres : '-'}</div>
        <div className="cell__value">{m.rate ? m.rate : '-'}</div>
        <div
          className="cell__value cell__value--remove"
          onClick={() => this.deleteMovie(m._id)}
        >
          delete
        </div>
      </div>
    ));

    return (
      <div>
        <div className="section">
        <MovieCreate addNewMovie={this.addNewMovie} />
          <div className="section__title">Movies</div>
          <div className="section__row--list">
            <div className="column-name">Title</div>
            <div className="column-name">Genres</div>
            <div className="column-name">Rate</div>
            <div className="column-name">Actions</div>
          </div>
          {displayMovies}
        </div>
      </div>
    );
  }
}

export default Movies;
