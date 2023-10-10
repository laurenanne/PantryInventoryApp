import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./auth/UserContext";
import NavBar from "./routes-nav/NavBar";
import Routes from "./routes-nav/Routes";
import PantryApi from "./pantryApi";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import pantryTheme from "./pantryTheme";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  // sets and maintains state for user, food, token
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");
  const [food, setFood] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [newFood, setNewFood] = useState([]);

  // upon loading call API to get the current user
  useEffect(() => {
    async function getUser() {
      try {
        let user = await PantryApi.getCurrentUser(currentUser.username);
        setCurrentUser(user);
      } catch (err) {
        setCurrentUser(null);
      }
    }
    getUser();
  }, [token]);

  // upon loading, call API to get a list of all food.
  // Since auth is required it will not fill food list until signin. Will reload once token is acquired and will refresh if inventory is updated or new food added
  //
  useEffect(() => {
    async function getFood() {
      let food = await PantryApi.getFood();
      setFood(food);
    }
    getFood();
  }, [token, inventory, newFood]);

  // adds or removes inventory amount
  async function updateInv(foodId, quantNum) {
    try {
      let update = await PantryApi.updateInv(foodId, quantNum);
      setInventory(update);
      return update;
    } catch (err) {
      return err;
    }
  }

  // adds a new food item to the food list
  async function addNewFood(data) {
    try {
      let food = await PantryApi.addFood(data);
      setNewFood(food);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  // function to handle login and sets current uer and token
  async function login(data) {
    try {
      let token = await PantryApi.login(data);
      PantryApi.token = token;
      setCurrentUser({ username: data.username });
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }

  // function to handle user logout. Clear token and current user
  function logout() {
    setToken("");
    setCurrentUser(null);
  }

  // function to handle new user signup
  async function signup(data) {
    try {
      await PantryApi.signup(data);

      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  // function to handle editing user information
  async function editUser(username, data) {
    try {
      let updatedUser = await PantryApi.editUser(username, data);
      setCurrentUser(updatedUser);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  return (
    <ThemeProvider theme={pantryTheme}>
      <CssBaseline />
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser }}>
          <div className="App">
            {currentUser ? <NavBar logout={logout} /> : ""}
            <Routes
              updateInv={updateInv}
              food={food}
              addNewFood={addNewFood}
              login={login}
              signup={signup}
              editUser={editUser}
            />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
