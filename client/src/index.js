import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import './index.css';

//Pages
import Layout from './components/Layout';
import CurrentView from './pages/CurrentView.js';
import CourseForecast from './pages/CourseForecast.js';
/*
import PlayableByDay from './pages/PlayableByDay';
import PlayableForecast from './pages/PlayableForecast';
import Preferences from './pages/Preferences';
*/



injectTapEventPlugin();

const app = document.getElementById('app');
ReactDOM.render(
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={CurrentView} />
                    <Route path="weekly">
                        <Route path=":courseName" component={CourseForecast}></Route>
                    </Route>
                </Route>
            </Router>
        </MuiThemeProvider>, 
app);
