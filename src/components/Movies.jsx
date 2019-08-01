import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from '../utils/paginate';
import Like from "./common/Like";


class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: []
    }

    //When an instance of this component is rendered in the dom, trigger
    componentDidMount() {
        //Movies and Genres were initialized to empty arrays at first to ensure they were not undefined, once a server response
        //is acquired, we update the component state
        this.setState({ movies: getMovies(), genres: getGenres() })
    }
    /*
        OnClick handler to delete movies from the displayed table
    */
    handleDelete = (movie) => {
        //console.log(movie);
        //Create a new array of movies that doesn't include the param movie
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        //Update movies state with movies param. Key and Value are the same so they don;t need to be repeated
        this.setState({ movies })
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    }

    handleLike = (movie) => {
        //Take a copy and give it to the set state method
        //We don't want to modify movies directly, it's an array of objects
        const moviesArr = [...this.state.movies];
        const index = moviesArr.indexOf(movie);
        moviesArr[index] = { ...moviesArr[index] }
        moviesArr[index].liked = !moviesArr[index].liked;
        this.setState({ movies: moviesArr })
    };

    handleGenreSelect = (genre) => {
        console.log(genre);
    }

    render() {
        //object destructuring
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } = this.state;

        const movies = paginate(allMovies, currentPage, pageSize);

        if (count === 0) {
            return <p>
                Looks like there aren't any movies in the database
            </p>
        }
        //2 Column Bootstrap Layout
        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col"> <p>Showing {count} movies in the database</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th />
                                <th />
                            </tr>
                        </thead>

                        <tbody>
                            {movies.map(movie => (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                                    </td>
                                    <td>
                                        <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    /></div>

            </div>
        );
    }
}

export default Movies;