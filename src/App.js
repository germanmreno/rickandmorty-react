import React, { useState } from 'react';
import Header from './components/Header';
import Characters from './components/Characters';

import './App.css';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const handleClick = () => {
        setDarkMode(!darkMode);
    };

    const theme = darkMode ? 'darkmode-background' : 'lightmode-background';

    return (
        <div className={`App ${theme}`}>
            <Header darkMode={darkMode} handleClick={handleClick} />
            <Characters />
        </div>
    );
}

export default App;
