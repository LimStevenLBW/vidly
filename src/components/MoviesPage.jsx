import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from '../utils/paginate';
import MoviesTable from "./MoviesTable";
import _ from 'lodash';

class MoviesPage extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' },
    }

    //When an instance of this component is rendered in the dom, trigger
    componentDidMount() {
        //Movies and Genres were initialized to empty arrays at first to ensure they were not undefined, once a server response
        //is acquired, we update the component state, include an All Genres Filter
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres })
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
        //Also reset current page to 1 to avoid bugs
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    }

    /* Steps: Filter, Sort, and then Paginate */
    getPagedData = (selectedGenre, allMovies, currentPage, pageSize, sortColumn) => {
        //If there is a selected genre(All Genres doesnt have an id), implement a filter
        const filteredMovies = selectedGenre && selectedGenre._id ?
            allMovies.filter(movie => movie.genre._id === selectedGenre._id)
            : allMovies

        //Sort the list
        const sortedArray = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
        //Paaginate the list
        const movies = paginate(sortedArray, currentPage, pageSize);

        return {totalCount: filteredMovies.length, data: movies}
    }

    render() {
        //object destructuring
        //const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state;

        const pagedData = this.getPagedData(selectedGenre, allMovies, currentPage, pageSize, sortColumn);
        
        //Display if no movies are available in the list
        if (pagedData.totalCount === 0) {
            return <p>
                Looks like there aren't any movies in the database
            </p>
        }
        //2 Column Bootstrap Layout
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        textProperty="name"
                        valueProperty="_id"
                        selectedItem={this.state.selectedGenre}
                    />
                </div>

                <div className="col">
                    <Link 
                        to = "/movies/new"
                        className = "btn btn-primary"
                        style = {{marginBottom: "20px" }}
                    >New Movie
                    </Link>
                    

                    <p>Showing {pagedData.totalCount} movies in the database</p>
                    <MoviesTable
                        movies={pagedData.data}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                        onSort={this.handleSort}
                    />

                    <Pagination
                        itemsCount={pagedData.totalCount}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    /></div>

            </div>
        );
    }
}

export default MoviesPage;