import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ShoppingList from "./components/shoppingList";
import MyRecipes from "./components/myRecipes";
import ExploreRecipes from "./components/exploreRecipes";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import RecipeDetail from "./components/recipeDetail";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RecipeForm from "./components/recipeForm";
import auth from "./services/authService";
import item from "./services/itemService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    user: null,
    items: null,
    isLoading: true,
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    const { data: items } = await item.getItems();
    this.setState({ user, items, isLoading: false });
  }

  render() {
    const { user, items, isLoading } = this.state;
    return (
      !isLoading && (
        <React.Fragment>
          <ToastContainer />
          <Navbar user={user} />
          <main className="container">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={RegisterForm} />
              {/* <Route path="/my-recipes/test" component={RecipeForm} /> */}
              <Route
                path="/my-recipes/:id"
                render={(props) => (
                  <RecipeForm {...props} user={user} items={items} />
                )}
              />
              <Route
                path="/my-recipes"
                render={(props) => <MyRecipes {...props} user={user} />}
              />
              <Route
                path="/explore-recipes"
                render={(props) => <ExploreRecipes {...props} user={user} />}
              />
              <Route path="/recipes/:id" component={RecipeDetail} />
              <Route
                path="/shopping-list"
                render={(props) => (
                  <ShoppingList {...props} user={user} items={items} />
                )}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/shopping-list" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
          <Footer />
        </React.Fragment>
      )
    );
  }
}

export default App;
