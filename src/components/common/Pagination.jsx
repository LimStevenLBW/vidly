import React from "react";
import _ from 'lodash';
import PropTypes from 'prop-types';
//lodash is an optimization of a popular js library called underscore

//If local state is not needed, create a stateless functional component

const Pagination = (props) => {
    //Object Destructuring
    const { itemsCount, pageSize, onPageChange, currentPage } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    //[1 ... pagesCount].map()

    //If there is only 1 page, don't display the page listing
    if (pagesCount <= 1) return null;

    //Create an array of iterating numbers
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                        <a
                            className="page-link"
                            onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
            {/* You can't use HTML comments inside of JSX bc it thinks they are real dom nodes, but js comments can still work
            <li className="page-item">
                <a className="page-link">1</a>
            </li>
            */}

        </nav>);
}

//Type Checking, will throw console error
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
}
export default Pagination;