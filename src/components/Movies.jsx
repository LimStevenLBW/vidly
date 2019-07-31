import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/Pagination";
import Like from "./common/Like";

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
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
        this.setState({currentPage: page})
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

    render() {
        //object destructuring
        const { length: count } = this.state.movies;
        const {pageSize, currentPage} = this.state;

        if (count === 0) {
            return <p>
                Looks like there aren't any movies in the database
            </p>
        }
        return (
            <React.Fragment>
                <p>Showing {count} movies in the database</p>
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
                        {this.state.movies.map(movie => (
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
                    currentPage = {currentPage}
                 />
            </React.Fragment>
        );
    }
}

export default Movies;