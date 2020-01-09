import React, { Component } from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import MoviesPage from "./components/MoviesPage.jsx";
import "./App.css";
import NotFound from "./components/NotFound.jsx";
import Rentals from "./components/Rentals.jsx";
import Customers from "./components/Customers.jsx";
import Navbar from "./components/Navbar.jsx";
import MoviesForm from "./components/MoviesForm.jsx";
import LoginForm from "./components/LoginForm.jsx";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Navbar />

        <Switch>
          <Route path = "/login" component = {LoginForm} />
          <Route path = "/movies/:id" component = {MoviesForm} />
          <Route path = "/movies" component = {MoviesPage} />
          <Route path = "/customers" component = {Customers} />
          <Route path = "/rentals" component = {Rentals} />
          <Route path = "/notfound" component = {NotFound} />
          <Redirect from = "/" exact to = "/movies" />
          <Redirect to = "/notfound" />
        </Switch>
      </main>
    );
  }
}

export default App;
