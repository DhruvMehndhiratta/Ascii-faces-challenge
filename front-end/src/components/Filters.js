import React from 'react';

const Filters = (props) => {

    const {
        handleSorting,
        sortOption = ''
    } = props;

    return (
        <ul>
            <li
                className={sortOption === "price" ? "active" : ""}
                onClick={() => handleSorting('price')}
            >
                Price <i className={sortOption === "price" ? "fas fa-chevron-up" : ""}
                />
            </li>
            <li
                className={sortOption === "size" ? "active" : ""}
                onClick={() => handleSorting('size')}
            >
                Size <i className={sortOption === "size" ? "fas fa-chevron-up" : ""}
                />
            </li>
            <li
                className={sortOption === "id" ? "active" : ""}
                onClick={() => handleSorting('id')}
            >
                ID<i className={sortOption === "id" ? "fas fa-chevron-up" : ""}
                />
            </li>
        </ul>
    )
}

export default Filters;
