import React from "react";
import PropTypes from 'prop-types';

import './sortSelect.style.css';

const SortSelect = (props) => {

    const handleChanger = (event) => {
        return props.refreshFunction(+event.target.value)
    };

    return(
        <div className='sort-select'>
            <select
                value={props.sort}
                onChange={(event) => handleChanger(event)}
            >
                <option value="-1">от новых к старым</option>
                <option value="1">от старым к новым</option>
            </select>
        </div>
    )


};

SortSelect.propTypes = {
    sort: PropTypes.number.isRequired,
    refreshFunction: PropTypes.func.isRequired
};


export default SortSelect;