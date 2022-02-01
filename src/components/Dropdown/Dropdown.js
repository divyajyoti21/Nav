import React from 'react';
import "./Dropdown.css";
function Dropdown(props) {
    
    return (
        <div className={props.show ? 'show-dropdown' : 'hide-dropdown'} data-testid="dropdown">
            {
                props.data.map((elem) => (
                    <div>{elem}</div>
                ))
            }

        </div>
    )
}

export default Dropdown