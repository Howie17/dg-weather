import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, hashHistory} from 'react-router';

//Pages
import CourseSearchForecast from './pages/CourseSearchForecast';
import Layout from './components/Layout';
import PlayableByDay from './pages/PlayableByDay';
import PlayableForecast from './pages/PlayableForecast';

import './index.css';

const app = document.getElementById('app');
ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={PlayableForecast}></IndexRoute>
                <Route path="coursesearchforecast" component={CourseSearchForecast}></Route>
                <Route path="playablebyday" component={PlayableByDay}></Route>
            </Route>
        </Router>, 
app);
