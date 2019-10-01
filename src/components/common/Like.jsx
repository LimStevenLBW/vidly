import React from 'react';

/**
 * This is a reusable component with minimum functionality
 * It is also a controlled component because it receives all the data 
 * it needs via props and notifies changes to the data using props
 * since there's no state or event handlers, we transformed it into 
 * a stateless functional component. We also removed all references to 'this'
 */
const Like = (props) => {

    let classes = "fa fa-heart";
    if (!props.liked) {
        classes += "-o";
    }

    return (
        <i className={classes}
            aria-hidden="true"
            onClick={props.onClick}
            style={{ cursor: "pointer" }}>
        </ i>
    );

}

export default Like;