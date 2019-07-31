import _ from 'lodash';

//Client Side Pagination
export function paginate(items, pageNumber, pageSize) {
    //First we need to calculate the starting index of items on the page
    const startIndex = (pageNumber - 1) * pageSize;
    //Will slice our array starting from an index
    return _(items) //lodash object wrapper
    .slice(startIndex)
    .take(pageSize) //Queries an array and creates a slice with n elements taken from the beginning
    .value(); //Return a regular array
}