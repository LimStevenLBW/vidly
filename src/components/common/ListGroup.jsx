import React from 'react';
//BootStrap ListGroup component
const ListGroup = (props) => {
    //Decoupled to use any json list
    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;

    if(items)
        return (
            < ul className="list-group clickable">
                {items.map(item => (
                    <li key={item[valueProperty]}
                        className={item === selectedItem ? "list-group-item active" : "list-group-item"}
                        onClick={() => onItemSelect(item)} >
                        {item[textProperty]}
                    </li>
                ))
                }
            </ul >
    );

    return <React.Fragment></React.Fragment>
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};

export default ListGroup;