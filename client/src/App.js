import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import ShoppingList from "./components/shoppingList";
import MyRecipes from "./components/myRecipes";
import ExploreRecipes from "./components/exploreRecipes";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RecipeForm from "./components/recipeFormDev";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/my-recipes/test" component={RecipeForm} />
            <Route path="/my-recipes" component={MyRecipes} />
            {/* <Route path="/my-recipes/:id" component={RecipeForm} /> */}
            <Route path="/explore-recipes" component={ExploreRecipes} />
            {/* <Route path="/recipes/:id" component={RecipeDetail} /> */}
            <Route path="/shopping-list" component={ShoppingList} user={user}/>
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
