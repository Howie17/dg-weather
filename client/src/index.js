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
import CourseSearchForecast from './pages/CourseSearchForecast';
import Layout from './components/Layout';

/*
import PlayableByDay from './pages/PlayableByDay';
import PlayableForecast from './pages/PlayableForecast';
import Preferences from './pages/Preferences';
*/
import DSForecast from './pages/DSForecast'


injectTapEventPlugin();

const app = document.getElementById('app');
ReactDOM.render(
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={DSForecast}></IndexRoute>
                    <Route path="coursesearchforecast" component={CourseSearchForecast}></Route>
                    {/*
                    <Route path="playablebyday" component={PlayableByDay}></Route>
                    <Route path="preferences" component={Preferences}></Route>
                    */}
                    <Route path="dsforecast" component={DSForecast}></Route> 
                </Route>
            </Router>
        </MuiThemeProvider>, 
app);
