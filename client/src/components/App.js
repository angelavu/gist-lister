import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import GitUser from './GitUser';
import ShowNewGist from './ShowNewGist';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Route exact path="/" component={GitUser} />
                    <Route
                        exact
                        path="/show-new-gist"
                        component={ShowNewGist}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
