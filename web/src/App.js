import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import './App.css';
import 'antd/dist/antd.css';
import Kg from './pages/Kg';
import CustomSearchPage from './pages/CustomSearchPage';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/search/:searchType/:drugsNames" component={SearchPage}/>
        <Route exact path="/KG" component={Kg}/>
        <Route path="/customsearch/:keywords?" component={CustomSearchPage}/>
      </Switch>
    </Router>
  );
}
export default App