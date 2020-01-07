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

    renderSortIcon = column => {
        if(column.path !== this.props.sortColumn.path) return null;
        if(this.props.sortColumn.order === 'asc') return <i className = "fa fa-sort-asc"></i>

        return <i className = "fa fa-sort-desc"></i>
    }

    render() {
        return (
            <thead>
                <tr>{this.props.columns.map(
                    column => 
                    <th className = "clickable" 
                        key={column.path || column.key} 
                        onClick={() => this.raiseSort(column.path)}> 
                          {column.label} 
                          {this.renderSortIcon(column)}
                    </th>
                )}</tr>
            </thead>
        );
    }
}

export default TableHeader;