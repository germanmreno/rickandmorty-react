import React from 'react';

import './Header.css';

const Header = ({ darkMode, handleClick }) => {
    return (
        <div className="Header">
            <div className="container">
                <h1>Rick and Morty - React Hooks</h1>
                <div>
                    <button
                        className={darkMode ? 'btn-dark' : ''}
                        type="button"
                        onClick={handleClick}>
                        {darkMode ? 'LIGHT MODE' : 'DARK MODE'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
