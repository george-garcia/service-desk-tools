import React from 'react';
import Sidebar from "./Components/Sidebar";
import './sass/main.scss';
import MainView from "./Components/MainView";
import { HashRouter, Route } from "react-router-dom";

const App = (props) => {
    return (
        <div>
            <HashRouter>
                <div>
                    <div className="container">
                        <div className="content">
                            <Sidebar/>
                            <Route path ='/' exact component={MainView}/>
                            <Route path ='/createTemplate' exact component={MainView}/>
                            <Route path='/editTemplate/:name' exact component={MainView}/>
                            <Route path='/use/:name' exact component={MainView}/>
                        </div>
                    </div>
                </div>
            </HashRouter>
        </div>
    );
};

export default App;

/*
<div>
            <HashRouter>
                <div>
                    <Nav/>
                    <Route path='/' exact component={Overview}/>
                    <Route path='/tours/:tourId' exact component={Tour}/>
                    <Route path='/login' exact component={Login} />
                    <Route path='/all-users' exact component={AllUsers}/>
                    <Route path='/Me' exact component={Profile}/>
                    <Footer/>
                </div>
            </HashRouter>
        </div>
 */