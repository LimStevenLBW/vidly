import React, { Component } from 'react'
import Like from "./common/Like";
import Table from './common/Table';

class MoviesTable extends Component {
    //Table Column Header Definition
    columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { key: 'like' , 
          content : movie => (
            <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
          )
        },
        { key: 'delete', 
          content : movie =>( 
            <button onClick={() => this.props.onDelete(movie)} 
                    className="btn btn-danger btn-sm"
            >
             Delete
            </button>
            )
        }
    ];

    render() {
        const { movies, sortColumn, onSort } = this.props;
        return (
            <Table
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
                data = {movies}
            />
          
        );

    }
}

export default MoviesTable;
