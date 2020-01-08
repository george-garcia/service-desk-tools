import React from 'react';
import Sidebar from "./Components/Sidebar";
import './sass/main.scss';
import MainView from "./Components/MainView";

const App = (props) => {
    return (
        <div className="container">
            <div className="content">
                <Sidebar/>
                <MainView/>
            </div>
        </div>
    );
};

export default App;