import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import './App.css';
import 'antd/dist/antd.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/search/:searchType/:drugsNames" component={SearchPage}/>
      </Switch>
    </Router>
  );
}
export default App