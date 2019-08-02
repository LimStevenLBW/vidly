import React, { Component } from 'react';

//Needs to know about columns(as an array)
//Needs the sortColumn object an onSort function
class TableHeader extends Component {
    raiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn }
        //If Match Found, Flip the sorting order
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    };

    render() {
        return (
            <thead>
                <tr>{this.props.columns.map(
                    column => <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)} > {column.label}</th>
                )}</tr>
            </thead >);
    }
}

export default TableHeader;