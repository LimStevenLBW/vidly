import React from 'react';
import Joi from 'joi-browser';
import Form from './common/Form';
import { saveMovie, getMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class MoviesForm extends Form {
    state = {
        data: {
            title: "",
            genre: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        genres: [],
        errors: {},
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .label("Number in Stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .label("Daily Rental Rate")
    };

    componentDidMount() {
        const genres = getGenres();
        this.setState({ genres });

        const movieId = this.props.match.params.id; //Check URL Match
        if(movieId === "new") return; //Return immediately, since no need to populate form

        const movie = getMovie(movieId);
        if(!movie) return this.props.history.replace("/not-found"); //Return is necessary to end the function, redirections do not stop code execution for this component
        
        this.setState({ data: this.mapToViewModel(movie) });
    }

    /**
     * Converts data from restful service to usable structure for displayed view
     */
    mapToViewModel(movie){
        return {
            _id: movie.id,
            title: movie.title,
            genreId: movie.genre_id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        }
    }

    doSubmit(){
        saveMovie(this.state.data);

        this.props.history.push("/movies")
    }

    render() {
        return (
            <React.Fragment>
                <h1>Movie Form</h1>
                <form onSubmit = {this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </React.Fragment>
        );
    }
}

export default MoviesForm;