import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import ShoppingList from "./components/shoppingList";
import MyRecipes from "./components/myRecipes";
import ExploreRecipes from "./components/exploreRecipes";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    // get the current user here
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar />

        <main className="container">
          <Switch>
            {/* <Route path="/login" component={LoginForm} /> */}
            {/* <Route path="/logout" component={Logout} /> */}
            <Route path="/register" component={RegisterForm} />
            <Route path="/my-recipes" component={MyRecipes} />
            {/* <Route path="/my-recipes/:id" component={RecipeForm} /> */}
            <Route path="/explore-recipes" component={ExploreRecipes} />
            {/* <Route path="/recipes/:id" component={RecipeDetail} /> */}
            <Route path="/shopping-list" component={ShoppingList} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/shopping-list" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
